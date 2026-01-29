import crypto from 'crypto';

const pastes = new Map();

const getNow = (req) => {
    if (process.env.TEST_MODE === '1' && req.headers['x-test-now-ms']) {
        return parseInt(req.headers['x-test-now-ms'], 10);
    }
    return Date.now();
};

export const healthCheck = (req, res) => res.json({ ok: true });

export const createPaste = (req, res) => {
    const { content, ttl_seconds, max_views } = req.body;

    if (!content) return res.status(400).json({ error: 'Content is required' });

    const id = crypto.randomBytes(4).toString('hex');
    const now = Date.now(); // Creation always uses system time
    const expiresAt = ttl_seconds ? now + (ttl_seconds * 1000) : null;

    pastes.set(id, {
        content,
        max_views: max_views ? parseInt(max_views) : null,
        remaining_views: max_views ? parseInt(max_views) : null,
        expires_at: expiresAt
    });

    res.status(201).json({ id, url: `${req.protocol}://${req.get('host')}/p/${id}` });
};

export const fetchPaste = (req, res) => {
    const { id } = req.params;
    const paste = pastes.get(id);

    if (!paste) return res.status(404).json({ error: 'Not found' });

    if (paste.expires_at) {
        const now = getNow(req);
        if (now > paste.expires_at) {
            pastes.delete(id);
            return res.status(404).json({ error: 'Expired' });
        }
    }

    if (paste.max_views !== null) {
        if (paste.remaining_views <= 0) {
            pastes.delete(id);
            return res.status(404).json({ error: 'View limit exceeded' });
        }
        paste.remaining_views -= 1;
    }

    res.json({
        content: paste.content,
        remaining_views: paste.remaining_views,
        expires_at: paste.expires_at ? new Date(paste.expires_at).toISOString() : null
    });
};