# Introduction 

Les 20 et 21 octobre 2017 à la Gaîté Lyrique à Paris, se tient un salon de l'édition libre et alternative où les participant·e·s présentent des productions et ouvrages imprimés réalisés avec les technologies du web et/ou des outils expérimentaux (génératifs, collaboratifs, libres et open source). Le salon est organisé par le collectif informel PrePostPrint[^prepostprint], initié par l'artiste et designer Raphaël Bastide et la designer graphique Sarah Garcin quelques mois plus tôt. La présentation de l'évènement rend compte de ce qui anime ce groupe de participant·e·s: 

![test figure](/src/images/graphic-means_1.jpeg){#test-figure .unlisted-figure}


> Nous souhaitons nous passer des logiciels classiques de mise en page et d'édition pour nous tourner vers des technologies plus accessibles et conviviales, pouvant évoluer et s'adapter à chaque projet. La programmation devient un outil de design et permet de réinventer sans cesse le processus de création éditoriale, questionnant les formats et les formes de publications.[^ppp-gaite]

[^prepostprint]: Sur le site web de PrePostPrint (URL: prepostprint.org/about, consulté le 08/03/2022), le collectif se présente ainsi : « We are now an loosely defined group of designers, artists, researchers, teachers sharing a wish to explore our tools and invent new ways of making web and print publications. »
[^ppp-gaite]: https://prepostprint.org/gaitelyrique, consulté de 07/03/2022.

Le 9 janvier 2018, dans les bureaux de MIT Press à Cambridge aux États-unis, se réunissent un ensemble d’acteur·rice·s du monde de l’édition et du web intéressé·e·s par l’utilisation des technologies du web pour l’impression et la mise en page automatisée. L'évènement, à l'initiative d'Adam Hyde, co-fondateur de la Collaborative Knowledge Foundation (Coko), a pour but de partager les diverses expériences des personnes présentes[^paged-media-mit]. Il marque surtout le départ d'une initiative collaborative pour le développement d'une approche technique libre et open source basée sur les standards du web écrits par le World Wide Web Consortium (W3C). Quelques semaines plus tard, le 23&nbsp;mars 2018[^commit-pagedjs] est publiée une première version de Paged.js, une librairie JavaScript libre et open-source qui permet l’export de PDF et l’affichage paginé dans le(s) navigateur(s) à partir des technologies du web.


<!-- ::: {.group-figure #figure-group-1}
- ![Image 1 caption](/src/images/graphic-means_1.jpeg)
- ![Image 2 caption](/src/images/ateliers-sirlo.jpg)

[Ceci est la legende commune]{.caption}
::: -->




[^paged-media-mit]: Erich Van Rijn, « Towards an Open Future for Automated TypsettingHighlights from Paged Media Event, January 9th 2018 », *Pagedmedia.org*, janvier 2018., consulté le 06/02/2020.
[^commit-pagedjs]: Date du premier *commit* par Fred Chasen sur le *repo* de Paged.js: https://gitlab.coko.foundation/<wbr>pagedjs/<wbr>pagedjs/<wbr>-/commits/<wbr>main

Du 28 au 30 novembre de la même année, trois workshops consécutifs « Paged Media × PrePostPrint » sont organisés à Bruxelles (dans les locaux d'Open Source Publishing) et à Paris (à l'École nationale supérieure des Arts Décoratifs) par Julien Taquet, Fred Chasen et moi-même[^workshops-paged-media]. Adressés à des professionnel·le·s de différents horizons (éditeur·rice·s, designers, rédacteur·rice·s, développeur·euse·s, etc.), ces workshops avaient pour but de présenter Paged.js et d'explorer les potentiels de l'impression avec les technologies du web. Les résultats des expérimentations menées pendant ces quelques jours sont divers: des participant·e·s ont cherché à intégrer l'outil dans leurs flux de travail existants, des éditeur·trie·s ont créé des feuilles de styles destinées à leurs collections de livres et des designers graphiques et artistes ont expérimentés l'hybridation de certaines fonctionnalités du web avec l'impression (polices de caractères variables, dégradés, rotation, gif, etc.).

[^workshops-paged-media]: Julie Blanc, « An Overview of the Paged Media Workshop », *Pagedmedia.org*, décembre 2028 , consulté le 19/12/2020.

Parallèlement, dans les derniers mois de l'année 2018 et les premiers mois de l'année 2019, Antoine Fauchié et moi-même travaillons avec l'équipe du musée Saint Raymond de Toulouse à la conception et au développement d'une publication multisupport composée d'un catalogue imprimé et d'un catalogue numérique (sous forme de site web). La chaîne de publication de cette double publication repose sur l'utilisation d'outils open source et collaboratifs et particulièrement sur les technologies du web et ses standards – à la fois pour l’écriture, l’édition, la composition et la diffusion des catalogues[^chiragan]. Ainsi, la version imprimée du catalogue, issue des mêmes contenus que ceux du site web, est la première publication imprimée en offset composée et mise en page avec Paged.js. 

[^chiragan]: Pour en savoir plus à propos de&nbsp;ce&nbsp;travail, voir un billet de blog que&nbsp;nous avons écris à ce sujet: Julie Blanc, « Une chaîne de&nbsp;publi-cation collaborative et&nbsp;multisupport pour le musée Saint-Raymond », *julie-blanc.fr*, novembre 2020, consulté le 5/11/2020.

*

Ces quelques évènements survenus juste avant que ne débute ce travail de recherche doctorale et dont nous avons fait l'expérience illustrent à divers degrés le développement de nouvelles pratiques dans le domaine du design graphique: l'utilisation des technologies du web pour la conception, la composition et la mise en page d'ouvrages et de documents imprimés[^web2print].

[^web2print]: Il est fait souvent référence à ces pratiques sous l’appellation de *web-to-print* (particulièrement dans le contexte francophone) et *CSS print*.



## Contexte de la recherche: les technologies du web pour l'impression

L'une de ces technologies, les feuilles de style en cascade, appelées CSS (de l'anglais *Cascading Style Sheets*), sont au cœur de ces pratiques. CSS est un langage informatique descriptif permettant de coder la mise en forme de documents structurés sur le web. Dès son invention, le langage permet d’adapter la mise en forme des documents à une multitude de périphériques de sorties (écran comme imprimé)  mais ses possibilités de mise en page pour les sorties imprimées ont longtemps été ignorées par les designers graphiques, notamment parce que le langage ne proposait alors pas assez de fonctionnalités pour permettre des mises en page élaborées. 

Or, depuis une dizaine d'années, l'utilisation du code dans les pratiques du design graphique, et particulièrement dans le web et l'impression, fait l'objet d'un intérêt toujours plus grand[^blanc_code_2022].  Les processus de programmation offriraient en effet des possibilités inédites d'articulation de différents médias, de génération de formes créatives et d'expérimentations graphiques et performatives diverses. Mais c'est particulièrement auprès d’une petite communauté de designers graphiques concernés par la relation à leurs outils et leurs valeurs culturelles intrinsèques que l'utilisation des technologies du web pour l'impression trouve un fort écho[^osp-pionnier]. Ces designers graphiques – situés majoritairement en France, en Belgique et aux Pays-Bas – adoptent en effet ces technologies pour s'inscrire dans une lutte  contre le monopole du logiciel à interface graphique Adobe InDesign, outil hégémonique dans la profession pour la conception de documents imprimés, mais posant des problèmes sociétaux et éthiques.

[^blanc_code_2022]: @blanc_code_2022. 
[^osp-pionnier]: Le collectif belge Open Source Publishing, utilisant uniquement des&nbsp;logciels libres et/ou open source pour&nbsp;produire des objets de design graphique, a&nbsp;joué un rôle pionnier  en&nbsp;ce&nbsp;sens, nous y&nbsp;reviendrons. 

### Les problèmes posés par Adobe InDesign

Adobe InDesign est un logiciel de Publication Assistée par Ordinateur (PAO) permettant de concevoir et de mettre en page divers supports destinés à l'impression. Depuis 2012, l’accès au logiciel fonctionne par  un abonnement mensuel ou annuel et des mises à jours fréquentes via un compte *Creative Cloud* nécessitant un accès par un réseau Internet.

Le premier problème que pose le logiciel est d'ordre politique puisque le modèle d'abonnement pose la question de la propriété des outils de travail des designers, comme l'exprime le designer graphique Nicolas Taffin:

> Le pêché mortel des designers graphiques pourrait bien être cette ignorance, qui les mène doucement sur la voie de la prolétarisation. Car c’est le moment ou l’outil n’est plus la propriété de l’artisan qu’il devient ouvrier. Et le réseau opère la machinisation complète et définitive de l’outil graphique.[^typotherapie]

Les designers graphiques sont ainsi rendus dépendants d'une entreprise privée (américaine) avec ses propres logiques commerciales et toutes les problématiques que cela pose. En 2019, au Venezuela, l'accès au logiciel est temporairement coupé dans tout le pays suite à une rupture d'accord commercial avec les États-Unis. En 2022, c'est l'utilisation de la bibliothèque de couleurs Pantone (sous licence propriétaire) qui est rendue payante dans le logiciel suite à un différent commercial entre les deux entreprises.

Par ailleurs, les très récentes mises à jour du logiciel n'échappent pas à deux controverses vivement débattues aujourd'hui: celle de l'utilisation des données personnelles sans consentement et celle de l'intelligence artificielle. Adobe embarque en effet une option d'analyse dans tous ses produits, option activée par défaut sans que ses client·e·s n'y consentent préalablement, qui autorise l'entreprise à « analyser les contenus à l'aide de technologies de machine learning telle la reconnaissance de motif ». La firme analyserait ainsi les créations de ses utilisateur·rice·s afin d’entraîner ses modèles d’intelligence artificielle. Or les problématiques que pose l'intelligence artificielle pour les professions dites « créatives », notamment en ce qui concerne la propriété intellectuelle, est aujourd'hui au cœur d'un vif débat[^masure-ia]. 

Le deuxième problème posé par InDesign est d'ordre économique. La question du coût de l'abonnement n'est pas négligeable pour une profession majoritairement sous statut indépendant. Cette problématique pèse même jusque dans les écoles d'arts et de design qui doivent sans cesse maintenir à jour leur parc de logiciels avec des abonnements et des licences qui pèsent lourdement sur des budgets de plus en plus restreints[^ensad-adobe]. 

Enfin, rapportons une autre critique adressée au logiciel exprimée par le chercheur Anthony Masure: son modèle de services basé sur des suites de sélections d’actions via des boutons et des menus réduirait les pratiques créatives à de simples tâches à exécuter dans une visée utilitariste[^masure-1]. Ce modèle entre en contradiction avec l’appétence des designers graphiques à donner du sens à l’utilisation de systèmes techniques par la combinaison d’une réflexion technique et d’une réflexion esthétique instrumentant leurs pratiques. 

[^masure-ia]: Masure Anthony, *Design sous artifice: La création au risque <br>du machine learning*  (Head Publishing, 2023) .

[^typotherapie]: « La vie n’est pas une ‹ Creative Suite › », dans @taffin_typotherapie_2023, p. 209.

[^masure-1]: Anthony Masure, « Adobe,  Le créatif au pouvoir ? », *Strabic.fr*  [en ligne] (2011) .

[^ensad-adobe]: Depuis plusieurs années, le&nbsp;contexte national est à la réduction budgétaire de tous les services publics, incluant les écoles d'art et de&nbsp;design. Le printemps 2023, a été l'occasion d'une forme mobilisation nationale de ces écoles reliée à ces mêmes questions budgétaires.  Enfin, rapportons que l'École nationale supérieure des Arts Déco-ratifs de paris, l'une des écoles les mieux dotées de France, dépense chaque année plus de 60 000€ dans les licences pour les logiciels Abode de ses quelques 800 élèves; et ce sans compter le coût humain de mainte-nance ainsi que la nécessité de renouveler le matériel informatique tous les 3-4 ans afin d'assurer la compatibilité avec la dernière version des logiciels. Le coût total a été évalué à plus de 120 000€ par an.  

### Quitter Adobe pour des technologies libres

Face à cela, certains designers invitent à quitter l’écosystème de logiciels propriétaires Adobe au profit des technologies libres et standardisées comme en atteste le manifeste « Relearn » d'Open Source Publishing[^osp_relearn_2011]. Parallèlement, ils·elles militent pour une « culture du code[^vilayphiou_culture-code_2011] » et une « design graphique libre[^ozeray] » avec une revendication forte de l'éthique du *hacker* dans le milieu du design graphique[^gelgon_dialogue_2018]. Les pratiques de code se rapportant à la culture du logiciel libre sont ainsi valorisées par ces designers graphiques travaillant avec la programmation. 

Un logiciel libre se définit par la possibilité d’inspecter, modifier et dupliquer son code source. Il implique donc que ce dernier soit accessible, notamment par une licence ouverte. Mais le logiciel libre est aussi une culture, réunissant une communauté de praticien·ne·s et dont les règles reposent sur des principes éthiques et des valeurs telles que la collaboration, le partage, la maîtrise de ses données personnelles et l’apprentissage collectif. En se référant à cette culture à travers l’adoption des technologies du web, les designers graphiques s’inscrivent alors dans une volonté utopique d’autonomie de production, où « la conception nécessairement ouverte et partagée du programme implique un pouvoir non concentré, qui met de fait ‹ au pouvoir › les membres de la communauté[^masure-3] ». Le partage de code source permet alors de rendre publics les processus et les outils mis en place dans l’élaboration d’un projet et de s’inscrire dans une communauté de pratique partageant les mêmes valeurs.

[^osp_relearn_2011]: @osp_relearn_2011.

[^vilayphiou_culture-code_2011]: Stéphanie Vilayphiou et Alexandre Leray, « Écrire le design : vers une culture du code »,  *Back Cover*, nᵒ 4 (2011): 37‑44 .
[^ozeray]: @ozeray_pour_2014.
[^gelgon_dialogue_2018]: Antoine Gelgon, « Un dialogue à&nbsp;réaliser: design et technique », in .txt&nbsp;3 (Éditions B42 ; École supérieure d’art et de design Grenoble-Valence, 2018), 38‑58 .
[^masure-3]: Anthony Masure, « Adobe,  Le créatif au pouvoir ? », *op.&nbsp;cit.*

....