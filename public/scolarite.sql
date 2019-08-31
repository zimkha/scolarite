-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  sam. 31 août 2019 à 15:27
-- Version du serveur :  10.1.40-MariaDB
-- Version de PHP :  7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `scolarite`
--

-- --------------------------------------------------------

--
-- Structure de la table `annee_scolaires`
--

CREATE TABLE `annee_scolaires` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `annee_scolaires`
--

INSERT INTO `annee_scolaires` (`id`, `date_debut`, `date_fin`, `created_at`, `updated_at`) VALUES
(1, '2019-08-07', '2020-07-03', '2019-08-29 00:00:00', '2019-08-29 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `cas_socials`
--

CREATE TABLE `cas_socials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

CREATE TABLE `classes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom_classe` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `niveau_classe_id` bigint(20) UNSIGNED NOT NULL,
  `somme_isncription` int(11) DEFAULT NULL,
  `mensualite` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `classes`
--

INSERT INTO `classes` (`id`, `nom_classe`, `niveau_classe_id`, `somme_isncription`, `mensualite`, `created_at`, `updated_at`) VALUES
(1, 'classe 1', 1, 25000, 15000, '2019-08-27 17:02:40', '2019-08-27 17:02:40'),
(2, 'classe 2', 2, 30000, 12000, NULL, NULL),
(3, 'classe 3', 3, 27000, 17000, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

CREATE TABLE `eleves` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `matricule` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `adresse` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `naissance` date DEFAULT NULL,
  `nomcomplet_tuteur` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `adresse_tuteur` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telephone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cas_ssocial` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `genre` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`id`, `matricule`, `nom`, `prenom`, `adresse`, `naissance`, `nomcomplet_tuteur`, `adresse_tuteur`, `telephone`, `cas_ssocial`, `created_at`, `updated_at`, `genre`) VALUES
(3, 'TP-92513', 'thiam', 'papis', NULL, '2019-08-01', NULL, NULL, NULL, NULL, '2019-08-30 00:49:22', '2019-08-30 00:49:22', 1),
(4, 'NS-36840', 'ndiaye', 'Sidi', NULL, '2019-08-01', NULL, NULL, NULL, NULL, '2019-08-30 00:54:19', '2019-08-30 00:54:19', 1),
(5, 'NS-43644', 'ndiaye', 'sidi', NULL, '2019-08-01', NULL, NULL, NULL, NULL, '2019-08-30 01:02:08', '2019-08-30 01:02:08', 1),
(6, 'NT-78948', 'ndiaye', 'THiernpo', NULL, NULL, NULL, NULL, NULL, NULL, '2019-08-30 11:18:32', '2019-08-31 12:39:50', 1),
(7, 'NA-79587', 'Ndiaye', 'Amadou', NULL, '2019-08-02', NULL, NULL, NULL, NULL, '2019-08-30 17:25:23', '2019-08-30 17:25:23', 1),
(9, 'DF-20448', 'Diouf', 'Fatou', NULL, NULL, NULL, NULL, NULL, NULL, '2019-08-30 23:05:07', '2019-08-30 23:05:07', 0);

-- --------------------------------------------------------

--
-- Structure de la table `evaluations`
--

CREATE TABLE `evaluations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `semestre_id` int(10) UNSIGNED NOT NULL,
  `classe_id` int(10) UNSIGNED NOT NULL,
  `annee_scolaire_id` int(10) UNSIGNED NOT NULL,
  `type_evaluation_id` int(10) UNSIGNED NOT NULL,
  `matiere_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inscriptions`
--

CREATE TABLE `inscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `eleve_id` int(10) UNSIGNED NOT NULL,
  `classe_id` int(10) UNSIGNED NOT NULL,
  `annee_scolaire_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `somme_inscription` int(11) NOT NULL,
  `etat_inscription` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `image` mediumtext COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `inscriptions`
--

INSERT INTO `inscriptions` (`id`, `eleve_id`, `classe_id`, `annee_scolaire_id`, `user_id`, `somme_inscription`, `etat_inscription`, `created_at`, `updated_at`, `image`) VALUES
(1, 3, 1, 1, 1, 25000, 1, '2019-08-27 16:53:34', '2019-08-27 16:53:34', ''),
(3, 4, 1, 1, 1, 25000, 1, '2019-08-30 00:54:19', '2019-08-30 00:54:19', ''),
(4, 5, 1, 1, 1, 25000, 1, '2019-08-30 01:02:08', '2019-08-30 01:02:08', ''),
(5, 6, 1, 1, 1, 25000, 1, '2019-08-30 11:18:32', '2019-08-30 11:18:32', ''),
(6, 7, 2, 1, 1, 30000, 1, '2019-08-30 17:25:24', '2019-08-30 17:25:24', ''),
(7, 9, 1, 1, 1, 25000, 1, '2019-08-30 23:05:07', '2019-08-30 23:05:07', '1567206307.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `matieres`
--

CREATE TABLE `matieres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom_matiere` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `matiere_classes`
--

CREATE TABLE `matiere_classes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `classe_id` int(10) UNSIGNED NOT NULL,
  `matiere_id` int(10) UNSIGNED NOT NULL,
  `coef` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mensuels`
--

CREATE TABLE `mensuels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `mois` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `mensuels`
--

INSERT INTO `mensuels` (`id`, `mois`, `created_at`, `updated_at`) VALUES
(1, 'Octobre', NULL, NULL),
(2, 'Novembre', NULL, NULL),
(3, 'Decembre', NULL, NULL),
(4, 'Janvier', NULL, NULL),
(5, 'Fervrier', NULL, NULL),
(6, 'Mars', NULL, NULL),
(7, 'Avril', NULL, NULL),
(8, 'Mai', NULL, NULL),
(9, 'Juin', NULL, NULL),
(10, 'Juillet', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(10, '2019_08_23_210321_create_classes_table', 2),
(11, '2019_08_23_210344_create_eleves_table', 2),
(12, '2019_08_23_210454_create_annee_scolaires_table', 2),
(13, '2019_08_23_210515_create_inscriptions_table', 2),
(14, '2019_08_23_210531_create_evaluations_table', 2),
(15, '2019_08_23_210547_create_matieres_table', 3),
(16, '2019_08_23_210638_create_note_evaluations_table', 3),
(17, '2019_08_23_212310_create_type_evaluations_table', 3),
(18, '2019_08_23_212331_create_semestres_table', 3),
(19, '2019_08_23_212916_create_professeurs_table', 3),
(20, '2019_08_23_224536_create_cas_socials_table', 3),
(21, '2019_08_23_235700_create_matiere_classes_table', 3),
(23, '2019_05_03_000001_create_customer_columns', 4),
(24, '2019_05_03_000002_create_subscriptions_table', 4),
(25, '2019_08_29_164600_add_genre_to_eleves_table', 5),
(26, '2019_08_30_013319_create_niveau_classes_table', 6),
(27, '2019_08_30_165003_add_image_to_inscriptions_table', 7),
(28, '2019_08_30_212248_create_mensuels_table', 8),
(29, '2019_08_30_212833_create_paiements_table', 9);

-- --------------------------------------------------------

--
-- Structure de la table `niveau_classes`
--

CREATE TABLE `niveau_classes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom_niveau` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `niveau_classes`
--

INSERT INTO `niveau_classes` (`id`, `nom_niveau`, `created_at`, `updated_at`) VALUES
(1, 'jardin', NULL, NULL),
(2, 'primaire', NULL, NULL),
(3, 'college', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `note_evaluations`
--

CREATE TABLE `note_evaluations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `matiere_classe_id` int(10) UNSIGNED NOT NULL,
  `note` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `paiements`
--

CREATE TABLE `paiements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `inscription_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mois_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `montant` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `professeurs`
--

CREATE TABLE `professeurs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pernom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `adresse` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `telephone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `matricule` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `semestres`
--

CREATE TABLE `semestres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_status` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_plan` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `type_evaluations`
--

CREATE TABLE `type_evaluations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `stripe_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `card_brand` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `card_last_four` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `annee_scolaires`
--
ALTER TABLE `annee_scolaires`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `cas_socials`
--
ALTER TABLE `cas_socials`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `eleves_matricule_unique` (`matricule`);

--
-- Index pour la table `evaluations`
--
ALTER TABLE `evaluations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `inscriptions`
--
ALTER TABLE `inscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `matiere_classes`
--
ALTER TABLE `matiere_classes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `mensuels`
--
ALTER TABLE `mensuels`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `niveau_classes`
--
ALTER TABLE `niveau_classes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `note_evaluations`
--
ALTER TABLE `note_evaluations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `paiements`
--
ALTER TABLE `paiements`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Index pour la table `professeurs`
--
ALTER TABLE `professeurs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `semestres`
--
ALTER TABLE `semestres`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriptions_user_id_stripe_status_index` (`user_id`,`stripe_status`);

--
-- Index pour la table `type_evaluations`
--
ALTER TABLE `type_evaluations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_stripe_id_index` (`stripe_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `annee_scolaires`
--
ALTER TABLE `annee_scolaires`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `cas_socials`
--
ALTER TABLE `cas_socials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `eleves`
--
ALTER TABLE `eleves`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `evaluations`
--
ALTER TABLE `evaluations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `inscriptions`
--
ALTER TABLE `inscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `matieres`
--
ALTER TABLE `matieres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `matiere_classes`
--
ALTER TABLE `matiere_classes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `mensuels`
--
ALTER TABLE `mensuels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `niveau_classes`
--
ALTER TABLE `niveau_classes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `note_evaluations`
--
ALTER TABLE `note_evaluations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `paiements`
--
ALTER TABLE `paiements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `professeurs`
--
ALTER TABLE `professeurs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `semestres`
--
ALTER TABLE `semestres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `type_evaluations`
--
ALTER TABLE `type_evaluations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
