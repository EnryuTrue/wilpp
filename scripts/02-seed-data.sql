-- Insert sample products
INSERT INTO products (name, description, image_url, price, available) VALUES
('Classic Snack Machine', 'Traditional snack vending machine with 40 selection slots. Perfect for offices and schools.', '/placeholder.svg?height=300&width=400', 2500.00, true),
('Beverage Cooler', 'Refrigerated beverage machine with glass front display. Holds up to 300 drinks.', '/placeholder.svg?height=300&width=400', 3200.00, true),
('Healthy Options Machine', 'Specialized machine for healthy snacks, salads, and organic products.', '/placeholder.svg?height=300&width=400', 2800.00, false),
('Coffee & Hot Drinks', 'Premium coffee machine with multiple hot beverage options and customization.', '/placeholder.svg?height=300&width=400', 4500.00, true);

-- Insert sample updates
INSERT INTO updates (title, excerpt, content, thumbnail_url, published) VALUES
('New Healthy Options Machine Launched', 'We''re excited to announce our new healthy vending machine featuring organic snacks, fresh salads, and nutritious beverages.', 'Full content here...', '/placeholder.svg?height=200&width=300', true),
('Partnership with Local Universities', 'Hippo Vending has partnered with three major universities to provide smart vending solutions across campus locations.', 'Full content here...', '/placeholder.svg?height=200&width=300', true),
('Contactless Payment Integration', 'All our vending machines now support contactless payments including Apple Pay, Google Pay, and tap-to-pay cards.', 'Full content here...', '/placeholder.svg?height=200&width=300', true);

-- Insert sample gallery images
INSERT INTO gallery (image_url, caption, alt_text) VALUES
('/placeholder.svg?height=400&width=600', 'Modern office installation', 'Vending machine in modern office lobby'),
('/placeholder.svg?height=400&width=600', 'University campus deployment', 'Multiple vending machines on university campus'),
('/placeholder.svg?height=400&width=600', 'Hospital healthy options', 'Healthy vending machine in hospital corridor'),
('/placeholder.svg?height=400&width=600', 'Shopping mall installation', 'Beverage machine in shopping mall'),
('/placeholder.svg?height=400&width=600', 'School cafeteria setup', 'Snack machine in school cafeteria'),
('/placeholder.svg?height=400&width=600', 'Airport terminal service', 'Coffee machine in airport terminal');

-- Insert admin user (password: admin123)
INSERT INTO admin_users (email, password_hash) VALUES
('admin@hippovending.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ');
