USE causes_db;

SELECT * from events;
#dummy data for development purposes;

INSERT INTO events
    (title, date, time, description, organizer_id, img_url, location_name, location_street, location_city, location_state, location_zip, createdAt, updatedAt)
VALUES
    ("March for Autism", "2012-12-31", "11:30:45", "A march to bring awareness for the struggles that austistic people face.", 1, "fakeimg@fake.net", "City Hall", "21 Center Avenue", "Denver", "CO", "80210", "1000-01-01 00:00:00", "1000-01-01 00:00:00");


