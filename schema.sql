CREATE TABLE product_outbox (
    id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    retry_count INT DEFAULT 0,
    next_retry_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);