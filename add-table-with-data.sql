create table orders (order_id integer not null primary key, order_date timestamp not null default current_timestamp, customer_id character varying(255) not null, amount real not null);
insert into orders (order_id, order_date, customer_id, amount) values (current_timestamp - interval '5 days', 'aaaa1111', 2387.25);
insert into orders (order_id, order_date, customer_id, amount) values (current_timestamp - interval '17 days', 'aaaa1111', 32823.25);
insert into orders (order_id, order_date, customer_id, amount) values (current_timestamp - interval '6 days', 'aaaa1111', 9348.25);
insert into orders (order_id, order_date, customer_id, amount) values (current_timestamp - interval '2 days', 'aaaa1111', 4587.25);
insert into orders (order_id, order_date, customer_id, amount) values (current_timestamp - interval '5 days', 'bbbb2222', 2387.25);
insert into orders (order_id, order_date, customer_id, amount) values (current_timestamp - interval '17 days', 'bbbb2222', 32823.25);
insert into orders (order_id, order_date, customer_id, amount) values (current_timestamp - interval '6 days', 'bbbb2222', 9348.25);
insert into orders (order_id, order_date, customer_id, amount) values (current_timestamp - interval '2 days', 'bbbb2222', 4587.25);