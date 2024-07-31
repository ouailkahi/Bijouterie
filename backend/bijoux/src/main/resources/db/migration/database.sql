CREATE TABLE TypesMetaux (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

INSERT INTO TypesMetaux (nom) VALUES
('Or'),
('Argent'),
('Platine'),
('Palladium'),
('Rhodium'),
('Nickel');

select * from TypesMetaux

CREATE TABLE Commandes (
    id SERIAL PRIMARY KEY,
    date_commande TIMESTAMP NOT NULL,
    prix_total DECIMAL(10, 2),
	statut Varchar(20)  default 'confirmed' Not null,
    profit_total DECIMAL(10, 2)
);

INSERT INTO Commandes (date_commande) VALUES
('2024-01-01 10:00:00'),
('2024-01-02 11:00:00'),
('2024-01-03 12:00:00'),
('2024-01-04 13:00:00'),
('2024-01-05 14:00:00'),
('2024-01-06 15:00:00');


select * from Commandes;

CREATE TABLE ArticlesCommande (
    id SERIAL PRIMARY KEY,
    commande_id bigint Not Null references Commandes(id),
	types_metaux bigint not null references  TypesMetaux(id),
    prix_article DECIMAL(10, 2) Not NULL ,
    profit_article DECIMAL(10, 2) Not NULL,
	poids DECIMAL(10,2) Not NULL 
);


INSERT INTO ArticlesCommande (commande_id, types_metaux, prix_article, profit_article, poids) VALUES
(7, 1, 100.00, 20.00, 5.00), -- Commande 1, Or
(7, 2, 150.00, 30.00, 7.50), -- Commande 1, Argent
(8, 3, 200.00, 40.00, 10.00), -- Commande 2, Platine
(8, 4, 250.00, 50.00, 12.50), -- Commande 2, Palladium
(9, 5, 300.00, 60.00, 15.00), -- Commande 3, Rhodium
(9, 6, 120.00, 24.00, 6.00);  -- Commande 3, Nickel


CREATE OR REPLACE FUNCTION get_total_profit_per_month()
RETURNS TABLE (month TEXT, total_profit DECIMAL) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        TO_CHAR(date_commande, 'YYYY-MM') AS month,
        SUM(profit_total) AS total_profit
    FROM
        Commandes
    GROUP BY
        TO_CHAR(date_commande, 'YYYY-MM')
    ORDER BY
        month;
END;
$$ LANGUAGE plpgsql;

select * from get_total_profit_per_month();

CREATE OR REPLACE FUNCTION update_commande()
RETURNS TRIGGER AS
$$
BEGIN
    -- Update the prix_total and profit_total for the commande
    UPDATE Commandes
    SET prix_total = (
        SELECT COALESCE(SUM(prix_article * poids), 0)
        FROM ArticlesCommande
        WHERE commande_id = NEW.commande_id
    ),
    profit_total = (
        SELECT COALESCE(SUM(profit_article), 0)
        FROM ArticlesCommande
        WHERE commande_id = NEW.commande_id
    )
    WHERE id = NEW.commande_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_commande_trigger
AFTER INSERT OR UPDATE ON ArticlesCommande
FOR EACH ROW
EXECUTE FUNCTION update_commande();

