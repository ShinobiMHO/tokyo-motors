-- ============================================================
-- SUPABASE_SETUP.sql — Tokyo Motors
-- ============================================================
-- Exécute ce fichier dans l'éditeur SQL de Supabase :
-- Dashboard Supabase → SQL Editor → New Query → Colle tout → Run
--
-- Ce script crée :
-- 1. Les tables `cars` et `contacts`
-- 2. Les politiques de sécurité RLS (Row Level Security)
-- 3. Le bucket de stockage pour les images
-- 4. Les 6 voitures de démo
-- ============================================================


-- ============================================================
-- SECTION 1 — TABLE `cars`
-- ============================================================

CREATE TABLE IF NOT EXISTS public.cars (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand           TEXT NOT NULL,
    model           TEXT NOT NULL,
    year            INTEGER NOT NULL CHECK (year >= 1980 AND year <= 2030),
    mileage_km      INTEGER NOT NULL CHECK (mileage_km >= 0),
    color           TEXT NOT NULL DEFAULT '',
    transmission    TEXT NOT NULL DEFAULT 'Automatic',
    engine          TEXT NOT NULL DEFAULT '',
    price_jpy       BIGINT NOT NULL CHECK (price_jpy >= 0),
    price_usd_estimate INTEGER NOT NULL DEFAULT 0 CHECK (price_usd_estimate >= 0),
    price_eur_estimate INTEGER NOT NULL DEFAULT 0 CHECK (price_eur_estimate >= 0),
    status          TEXT NOT NULL DEFAULT 'available'
                        CHECK (status IN ('available', 'reserved', 'sold')),
    description     TEXT NOT NULL DEFAULT '',
    images          TEXT[] NOT NULL DEFAULT '{}',
    featured        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_cars_status   ON public.cars (status);
CREATE INDEX IF NOT EXISTS idx_cars_brand    ON public.cars (brand);
CREATE INDEX IF NOT EXISTS idx_cars_featured ON public.cars (featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_cars_created  ON public.cars (created_at DESC);

-- Commentaires sur les colonnes
COMMENT ON TABLE  public.cars IS 'Inventaire des supercars Tokyo Motors';
COMMENT ON COLUMN public.cars.price_jpy IS 'Prix d''achat au Japon en Yen (¥)';
COMMENT ON COLUMN public.cars.price_usd_estimate IS 'Prix estimé total en USD (commission incluse)';
COMMENT ON COLUMN public.cars.price_eur_estimate IS 'Prix estimé total en EUR (commission incluse)';
COMMENT ON COLUMN public.cars.status IS 'available | reserved | sold';
COMMENT ON COLUMN public.cars.images IS 'Tableau d''URLs d''images (Supabase Storage ou Unsplash)';
COMMENT ON COLUMN public.cars.featured IS 'Si TRUE, affiché sur la homepage';


-- ============================================================
-- SECTION 2 — TABLE `contacts`
-- ============================================================

CREATE TABLE IF NOT EXISTS public.contacts (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name         TEXT NOT NULL,
    email        TEXT NOT NULL,
    phone        TEXT NOT NULL DEFAULT '',
    country      TEXT NOT NULL DEFAULT '',
    car_interest TEXT NOT NULL DEFAULT '',
    message      TEXT NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    read         BOOLEAN NOT NULL DEFAULT FALSE
);

-- Index
CREATE INDEX IF NOT EXISTS idx_contacts_read    ON public.contacts (read) WHERE read = FALSE;
CREATE INDEX IF NOT EXISTS idx_contacts_created ON public.contacts (created_at DESC);

COMMENT ON TABLE  public.contacts IS 'Messages de contact reçus via le formulaire du site';
COMMENT ON COLUMN public.contacts.read IS 'FALSE = non lu par l''admin, TRUE = lu';


-- ============================================================
-- SECTION 3 — ROW LEVEL SECURITY (RLS)
-- Sécurité : qui peut lire/écrire quoi
-- ============================================================

-- Activer RLS sur les deux tables
ALTER TABLE public.cars     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- ---- Politiques pour `cars` ----

-- Tout le monde peut LIRE les voitures (site public)
CREATE POLICY "cars_public_read"
    ON public.cars FOR SELECT
    TO anon, authenticated
    USING (TRUE);

-- Seulement les admins connectés peuvent CRÉER une voiture
CREATE POLICY "cars_admin_insert"
    ON public.cars FOR INSERT
    TO authenticated
    WITH CHECK (TRUE);

-- Seulement les admins peuvent MODIFIER
CREATE POLICY "cars_admin_update"
    ON public.cars FOR UPDATE
    TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

-- Seulement les admins peuvent SUPPRIMER
CREATE POLICY "cars_admin_delete"
    ON public.cars FOR DELETE
    TO authenticated
    USING (TRUE);

-- ---- Politiques pour `contacts` ----

-- Tout le monde peut ENVOYER un message (formulaire public)
CREATE POLICY "contacts_public_insert"
    ON public.contacts FOR INSERT
    TO anon, authenticated
    WITH CHECK (TRUE);

-- Seulement les admins peuvent LIRE les messages
CREATE POLICY "contacts_admin_read"
    ON public.contacts FOR SELECT
    TO authenticated
    USING (TRUE);

-- Seulement les admins peuvent MODIFIER (ex: marquer comme lu)
CREATE POLICY "contacts_admin_update"
    ON public.contacts FOR UPDATE
    TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

-- Seulement les admins peuvent SUPPRIMER un message
CREATE POLICY "contacts_admin_delete"
    ON public.contacts FOR DELETE
    TO authenticated
    USING (TRUE);


-- ============================================================
-- SECTION 4 — STORAGE BUCKET pour les images
-- ============================================================

-- Créer le bucket "car-images" (public = visible sans auth)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'car-images',
    'car-images',
    TRUE,
    10485760,  -- 10 MB max par image
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Politique : tout le monde peut VOIR les images
CREATE POLICY "car_images_public_read"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'car-images');

-- Politique : seulement les admins peuvent UPLOADER
CREATE POLICY "car_images_admin_insert"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'car-images');

-- Politique : seulement les admins peuvent SUPPRIMER
CREATE POLICY "car_images_admin_delete"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'car-images');


-- ============================================================
-- SECTION 5 — DONNÉES DE DÉMO (6 supercars)
-- ============================================================

INSERT INTO public.cars
    (brand, model, year, mileage_km, color, transmission, engine,
     price_jpy, price_usd_estimate, price_eur_estimate,
     status, description, images, featured)
VALUES

-- 1. Ferrari 488 Pista
(
    'Ferrari', '488 Pista', 2019, 8200,
    'Rosso Corsa', 'Automatic (PDK)', 'V8 3.9L Twin-Turbo 720 ch',
    74235000, 574000, 532000,
    'available',
    'La Ferrari 488 Pista représente le summum de la sportivité Ferrari. Dérivée directement des compétitions, elle développe 720 ch grâce à son V8 biturbo. En parfait état, kilométrage exceptionnel pour une voiture de ce calibre. Entretenu par un concessionnaire Ferrari officiel au Japon.',
    ARRAY[
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80'
    ],
    TRUE
),

-- 2. Lamborghini Huracán EVO
(
    'Lamborghini', 'Huracán EVO', 2020, 11500,
    'Arancio Borealis', 'Automatic (LDF)', 'V10 5.2L Atmosphérique 640 ch',
    30880000, 238000, 221000,
    'available',
    'La Huracán EVO incarne l''essence même de Lamborghini — viscérale, spectaculaire, inoubliable. Son V10 atmosphérique hurlant à 9000 tr/min est l''un des derniers moteurs de ce type dans l''industrie. La couleur Arancio Borealis est absolument saisissante. Première main, carnet d''entretien complet.',
    ARRAY[
        'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=80',
        'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=80',
        'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80'
    ],
    TRUE
),

-- 3. McLaren 720S
(
    'McLaren', '720S', 2019, 14200,
    'Volcano Orange', 'Automatic (SSG)', 'V8 4.0L Twin-Turbo 720 ch',
    24830000, 191000, 177000,
    'available',
    'La McLaren 720S redéfinit ce qu''est une supercar. Légère, rapide, avec une aérodynamique active révolutionnaire. 0-100 km/h en 2,9 secondes. Cette 720S Volcano Orange est en état showroom, révision complète effectuée par le concessionnaire McLaren Tokyo.',
    ARRAY[
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80'
    ],
    TRUE
),

-- 4. Porsche 911 GT3 992
(
    'Porsche', '911 GT3 992', 2022, 5800,
    'Guards Red', 'PDK 7 rapports', 'Flat-6 4.0L Atmosphérique 510 ch',
    31464000, 243000, 225000,
    'available',
    'La 911 GT3 992 est la Porsche la plus désirable du moment. Son flat-six atmosphérique de 4.0L hurlant à 9000 tr/min est une véritable œuvre d''ingénierie. Kilométrage très bas, aucun défaut. Propriétaire japonais collectionneur. Option Clubsport, Pack Chrono.',
    ARRAY[
        'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200&q=80',
        'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=1200&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80'
    ],
    FALSE
),

-- 5. Rolls-Royce Ghost
(
    'Rolls-Royce', 'Ghost', 2021, 9200,
    'Arctic White', 'Automatique 8 rapports ZF', 'V12 6.75L Twin-Turbo 571 ch',
    38000000, 294000, 272000,
    'reserved',
    'La Rolls-Royce Ghost nouvelle génération — le véhicule ultime du confort et du prestige. Design "Post Opulence", suspension sur coussins d''air auto-nivelante, Starlight Headliner avec 1344 étoiles en fibre optique. Propriétaire unique, garage couvert, utilisation occasionnelle.',
    ARRAY[
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80'
    ],
    FALSE
),

-- 6. Lamborghini Urus
(
    'Lamborghini', 'Urus', 2022, 13100,
    'Nero Noctis', 'Automatique 8 rapports', 'V8 4.0L Twin-Turbo 650 ch',
    28122000, 217000, 201000,
    'available',
    'L''Urus est le SUV supercar par excellence. 650 chevaux, 0-100 en 3,5 secondes, intérieur luxueux en cuir pleine fleur noir. Pack ANIMA complet, Pack Pearl, jantes Taigete 23 pouces. En parfait état, entretien Lamborghini officiel.',
    ARRAY[
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80',
        'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=80',
        'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80'
    ],
    FALSE
);


-- ============================================================
-- SECTION 6 — CRÉER UN COMPTE ADMIN
-- ============================================================
-- ⚠️  NE PAS exécuter ça dans le SQL Editor !
-- Crée plutôt ton compte admin via :
-- Supabase Dashboard → Authentication → Users → "Add user"
-- Email : ton email admin
-- Password : un mot de passe fort (12+ caractères)
-- ============================================================


-- ============================================================
-- VÉRIFICATION — Exécute ça pour confirmer que tout est OK
-- ============================================================
-- SELECT COUNT(*) AS nb_cars FROM public.cars;
-- → Doit afficher 6
--
-- SELECT tablename, rowsecurity FROM pg_tables
-- WHERE schemaname = 'public' AND tablename IN ('cars','contacts');
-- → rowsecurity doit être "true" pour les deux tables
--
-- SELECT name FROM storage.buckets WHERE id = 'car-images';
-- → Doit afficher "car-images"
-- ============================================================
