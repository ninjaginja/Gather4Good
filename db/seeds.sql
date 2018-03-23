USE causes_db;


#dummy data for development purposes;

INSERT INTO events
    (title, date, time, description, organizer_id, img_url, location_name, location_street, location_city, location_state, location_zip, createdAt, updatedAt, CauseId)
VALUES
    ("March for Autism", "2012-12-31", "11:30:45", "A march to bring awareness for the struggles that austistic people face.", 1, "fakeimg@fake.net", "City Hall", "21 Center Avenue", "Denver", "CO", "80210", "1000-01-01 00:00:00", "1000-01-01 00:00:00", 7);
    
INSERT INTO events
    (title, date, time, description, organizer_id, location_street, location_city, location_state, location_zip, createdAt, updatedAt)
VALUES
    ("March for Our Lives", "2012-03-24", "12:30:45", "A march to end gun violence.", 1, "fakeimg@fake.net", "City Hall", "21 Center Avenue", "Denver", "CO", "80210", "1000-01-01 00:00:00", "1000-01-01 00:00:00");

SELECT * from events;
SELECT * from causes;
-- INSERT INTO events
--     (title, date, time, description, organizer_id, img_url, location_name, location_street, location_city, location_state, location_zip, createdAt, updatedAt)
-- VALUES
--     ("Rally for Rhinos", "2016-2-1 11:56:00", "A rally to bring awareness for the struggles that rhinos face.", 1, "fakeimg2@fake.net", "Town Square", "82 Main Street", "Boulder", "CO", "80305", "1000-01-01 00:00:00", "1000-01-01 00:00:00");


INSERT INTO causes(name) VALUES ("Gender Equality");
INSERT INTO causes(name) VALUES ("LGBTQ Rights");
INSERT INTO causes(name) VALUES ("Environment");
INSERT INTO causes(name) VALUES ("Racial Equality");
INSERT INTO causes(name) VALUES ("Animal Rights");
INSERT INTO causes(name) VALUES ("Education");
INSERT INTO causes(name) VALUES ("Human Rights");
INSERT INTO causes(name) VALUES ("Immigration");
INSERT INTO causes(name) VALUES ("Public Health");
INSERT INTO causes(name) VALUES ("Economic Equality");
INSERT INTO causes(name) VALUES ("Gun Violence");
