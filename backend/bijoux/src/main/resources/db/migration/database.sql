CREATE TABLE TypesMetaux (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

CREATE TABLE Commandes (
    id SERIAL PRIMARY KEY,
    date_commande TIMESTAMP NOT NULL,
    prix_total DECIMAL(10, 2),
	statut Varchar(20)  default 'confirmed' Not null,
    profit_total DECIMAL(10, 2)
);


CREATE TABLE ArticlesCommande (
    id SERIAL PRIMARY KEY,
    commande_id bigint Not Null references Commandes(id),
	types_metaux bigint not null references  TypesMetaux(id),
    prix_article DECIMAL(10, 2) Not NULL ,
    profit_article DECIMAL(10, 2) Not NULL,
	poids DECIMAL(10,2) Not NULL
);


CREATE OR REPLACE FUNCTION get_total_profit_per_month()
RETURNS TABLE (month TEXT, total_profit DECIMAL,total_prix DECIMAL, total_poids DECIMAL) AS
$$
BEGIN
    RETURN QUERY
   SELECT
        TO_CHAR(date_commande, 'YYYY-MM') AS month,
        SUM(profit_total) AS total_profit,
        SUM(prix_total) AS total_prix,
        SUM(poids) AS total_poids
    FROM
        Commandes
    JOIN
        ArticlesCommande ON ArticlesCommande.commande_id = Commandes.id
    WHERE
        date_trunc('month', date_commande) = date_trunc('month', CURRENT_DATE)
    GROUP BY
        TO_CHAR(date_commande, 'YYYY-MM')
    ORDER BY
        month;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_total_profit_per_months()
RETURNS TABLE (month TEXT, total_profit DECIMAL,total_prix DECIMAL, total_poids DECIMAL) AS
$$
BEGIN
    RETURN QUERY
   SELECT
        TO_CHAR(date_commande, 'YYYY-MM') AS month,
        SUM(profit_total) AS total_profit,
        SUM(prix_total) AS total_prix,
        SUM(poids) AS total_poids
    FROM
        Commandes
    JOIN
        ArticlesCommande ON ArticlesCommande.commande_id = Commandes.id
    GROUP BY
        TO_CHAR(date_commande, 'YYYY-MM')
    ORDER BY
        month;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_total_profit_per_day()
RETURNS TABLE (
    day DATE,
    total_profit DECIMAL,
    total_prix DECIMAL,
    total_poids DECIMAL
) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        DATE(date_commande) AS day,  -- Extracts the date part from the timestamp
        SUM(profit_total) AS total_profit,
        SUM(prix_total) AS total_prix,
        SUM(poids) AS total_poids
    FROM
        Commandes
    JOIN
        ArticlesCommande ON ArticlesCommande.commande_id = Commandes.id
    WHERE
        DATE(date_commande) = CURRENT_DATE
    GROUP BY
        DATE(date_commande)
    ORDER BY
        day;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_total_profit_per_days()
RETURNS TABLE (
    day DATE,
    total_profit DECIMAL,
    total_prix DECIMAL,
    total_poids DECIMAL
) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        DATE(date_commande) AS day,  -- Extracts the date part from the timestamp
        SUM(profit_total) AS total_profit,
        SUM(prix_total) AS total_prix,
        SUM(poids) AS total_poids
    FROM
        Commandes
    JOIN
        ArticlesCommande ON ArticlesCommande.commande_id = Commandes.id
    GROUP BY
        DATE(date_commande)
    ORDER BY
        day;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION update_commande()
RETURNS TRIGGER AS
$$
BEGIN
    -- Update the prix_total and profit_total for the commande
    UPDATE Commandes
    SET prix_total = (
        SELECT COALESCE(SUM(prix_article ), 0)
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




CREATE OR REPLACE FUNCTION get_total_weight_per_metal()
RETURNS TABLE (type_metal varchar(255), total_poids DECIMAL) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        tm.nom AS type_metal,
        COALESCE(SUM(ac.poids), 0) AS total_poids
    FROM
        ArticlesCommande ac
    JOIN
        TypesMetaux tm ON ac.types_metaux = tm.id
    GROUP BY
        tm.nom;
END;
$$ LANGUAGE plpgsql;

