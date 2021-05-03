
--
-- Name: blog_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog_comments (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    author_id integer NOT NULL,
    content text NOT NULL,
    reactions json DEFAULT '[]'::json NOT NULL,
    blog_id integer NOT NULL,
    parent_id integer,
    reported boolean DEFAULT false NOT NULL,
    deleted boolean DEFAULT false NOT NULL,
    edited boolean DEFAULT false NOT NULL,
    history json DEFAULT '[]'::json NOT NULL,
    reports json DEFAULT '[]'::json NOT NULL
);


ALTER TABLE public.blog_comments OWNER TO postgres;

--
-- Name: blog_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blog_comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_comments_id_seq OWNER TO postgres;

--
-- Name: blog_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blog_comments_id_seq OWNED BY public.blog_comments.id;


--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog_posts (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    author_id integer NOT NULL,
    content text NOT NULL,
    tags json DEFAULT '[]'::json NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    reactions json DEFAULT '[]'::json NOT NULL,
    title character varying(50) NOT NULL,
    image text DEFAULT 'none.webp'::text NOT NULL
);


ALTER TABLE public.blog_posts OWNER TO postgres;

--
-- Name: blog_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blog_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_posts_id_seq OWNER TO postgres;

--
-- Name: blog_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blog_posts_id_seq OWNED BY public.blog_posts.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    supersecretword character varying(200) NOT NULL,
    salt character varying(14) NOT NULL,
    email character varying(50) NOT NULL,
    admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: blog_comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_comments ALTER COLUMN id SET DEFAULT nextval('public.blog_comments_id_seq'::regclass);


--
-- Name: blog_posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts ALTER COLUMN id SET DEFAULT nextval('public.blog_posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: blog_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (10, '2021-04-29 12:21:36+02', 7, '> &quot;It''s a bit dry for me!&quot;

Me too, way too much text!', '[{"userId":2,"reaction":"laugh"},{"userId":4,"reaction":"laugh"},{"userId":5,"reaction":"like"},{"userId":6,"reaction":"laugh"}]', 2, 5, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (17, '2021-04-29 12:31:12+02', 2, 'You might learn something from reading it!', '[{"userId":4,"reaction":"like"},{"userId":5,"reaction":"laugh"},{"userId":6,"reaction":"laugh"}]', 2, 10, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (21, '2021-04-29 12:34:16+02', 3, 'I''ll add it to the list!', '[{"userId":5,"reaction":"like"}]', 4, 13, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (20, '2021-04-29 12:33:40+02', 3, 'Attack is the *best* form of defence!', '[{"userId":4,"reaction":"like"},{"userId":5,"reaction":"like"},{"userId":6,"reaction":"heart"},{"userId":7,"reaction":"like"}]', 5, 7, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (8, '2021-04-29 12:19:53+02', 7, 'How do I downvote this post?', '[{"userId":2,"reaction":"laugh"},{"userId":3,"reaction":"laugh"},{"userId":4,"reaction":"laugh"},{"userId":5,"reaction":"like"},{"userId":6,"reaction":"laugh"}]', 3, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (15, '2021-04-29 12:30:23+02', 2, 'Such a sourpuss!', '[{"userId":3,"reaction":"like"},{"userId":4,"reaction":"like"},{"userId":5,"reaction":"like"},{"userId":6,"reaction":"heart"}]', 3, 8, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (19, '2021-04-29 12:32:59+02', 3, 'Alexandria is like a worse Tenochtitlan', '[{"userId":4,"reaction":"laugh"},{"userId":5,"reaction":"laugh"},{"userId":6,"reaction":"laugh"},{"userId":7,"reaction":"like"}]', 7, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (1, '2021-04-29 12:08:12+02', 3, 'It''s a great song! I like the line:

> &quot;The history book on the shelf Is always repeating itself&quot;', '[{"userId":5,"reaction":"like"},{"userId":2,"reaction":"like"},{"userId":4,"reaction":"like"},{"userId":6,"reaction":"like"}]', 3, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (13, '2021-04-29 12:29:41+02', 2, 'You forgot Greece!', '[{"userId":3,"reaction":"like"},{"userId":4,"reaction":"like"},{"userId":5,"reaction":"like"},{"userId":6,"reaction":"like"},{"userId":7,"reaction":"like"}]', 4, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (6, '2021-04-29 12:19:01+02', 7, 'France > Spain!', '[{"userId":2,"reaction":"laugh"},{"userId":3,"reaction":"laugh"},{"userId":4,"reaction":"laugh"},{"userId":5,"reaction":"laugh"},{"userId":6,"reaction":"laugh"},{"userId":7,"reaction":"like"}]', 4, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (23, '2021-04-29 12:35:53+02', 4, 'You''re right!', '[{"userId":5,"reaction":"like"},{"userId":6,"reaction":"like"},{"userId":7,"reaction":"heart"}]', 5, 20, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (14, '2021-04-29 12:30:04+02', 2, 'I *almost* got there!', '[{"userId":3,"reaction":"laugh"},{"userId":4,"reaction":"laugh"},{"userId":5,"reaction":"trophy"},{"userId":6,"reaction":"laugh"},{"userId":7,"reaction":"heart"}]', 4, 3, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (4, '2021-04-29 12:16:39+02', 5, 'It''s the opposite of my book!', '[{"userId":2,"reaction":"laugh"},{"userId":3,"reaction":"like"},{"userId":4,"reaction":"laugh"},{"userId":6,"reaction":"laugh"}]', 3, 1, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (27, '2021-04-29 12:41:28+02', 6, 'Classic Napoleon never learning never reading', '[]', 2, 17, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (2, '2021-04-29 12:08:38+02', 3, 'Very interesting!', '[{"userId":5,"reaction":"laugh"},{"userId":7,"reaction":"laugh"},{"userId":2,"reaction":"like"},{"userId":4,"reaction":"like"},{"userId":6,"reaction":"like"}]', 2, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (29, '2021-04-29 12:43:14+02', 7, '😠😠😠', '[]', 3, 15, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (12, '2021-04-29 12:29:20+02', 2, 'I forgot Alexandria!!!! And Alexandria II! Whoops!', '[{"userId":3,"reaction":"laugh"},{"userId":4,"reaction":"laugh"},{"userId":5,"reaction":"laugh"},{"userId":6,"reaction":"like"},{"userId":7,"reaction":"heart"}]', 7, NULL, false, false, true, '["I forgot Alexandria!!!!","I forgot Alexandria!!!! And Alexandria II!"]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (3, '2021-04-29 12:15:50+02', 5, 'China is the best place to visit - it''s really interesting here!', '[{"userId":7,"reaction":"laugh"},{"userId":2,"reaction":"like"},{"userId":3,"reaction":"like"},{"userId":4,"reaction":"trophy"},{"userId":5,"reaction":"like"},{"userId":6,"reaction":"like"}]', 4, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (16, '2021-04-29 12:30:42+02', 2, 'Hilarious as always', '[{"userId":3,"reaction":"like"},{"userId":4,"reaction":"like"},{"userId":5,"reaction":"heart"},{"userId":6,"reaction":"trophy"}]', 3, 4, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (18, '2021-04-29 12:31:58+02', 2, 'Almost as good as my account of the Battle of the Granicus River!', '[{"userId":4,"reaction":"laugh"},{"userId":5,"reaction":"like"},{"userId":6,"reaction":"like"}]', 2, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (24, '2021-04-29 12:36:23+02', 4, 'Yes Sweden!', '[{"userId":5,"reaction":"laugh"},{"userId":6,"reaction":"like"},{"userId":7,"reaction":"like"}]', 4, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (11, '2021-04-29 12:29:03+02', 2, 'Really interesting, looking forward to reading your book.', '[{"userId":3,"reaction":"like"},{"userId":4,"reaction":"like"},{"userId":5,"reaction":"like"},{"userId":6,"reaction":"like"}]', 5, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (26, '2021-04-29 12:38:26+02', 5, '*Almost*', '[{"userId":6,"reaction":"heart"}]', 4, 14, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (7, '2021-04-29 12:19:33+02', 7, '> &quot;Defines the source of strength as unity, not size, and discusses the five factors that are needed to succeed in any war. In order of importance, these critical factors are: Attack, Strategy, Alliances, Army and Cities.&quot;

This is key in my opinion!', '[{"userId":2,"reaction":"like"},{"userId":3,"reaction":"like"},{"userId":4,"reaction":"like"},{"userId":5,"reaction":"like"},{"userId":6,"reaction":"laugh"}]', 5, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (9, '2021-04-29 12:20:11+02', 7, 'How to delete someone else''s post?!', '[{"userId":2,"reaction":"laugh"},{"userId":3,"reaction":"laugh"},{"userId":4,"reaction":"laugh"},{"userId":5,"reaction":"laugh"},{"userId":6,"reaction":"laugh"}]', 3, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (5, '2021-04-29 12:17:16+02', 5, 'It''s a bit dry for me!', '[{"userId":7,"reaction":"like"},{"userId":2,"reaction":"laugh"},{"userId":4,"reaction":"laugh"},{"userId":6,"reaction":"laugh"}]', 2, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (22, '2021-04-29 12:35:27+02', 4, 'What are you like', '[{"userId":5,"reaction":"like"},{"userId":6,"reaction":"like"},{"userId":7,"reaction":"like"}]', 7, NULL, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (25, '2021-04-29 12:37:41+02', 5, 'Glad you agree.', '[{"userId":6,"reaction":"laugh"},{"userId":7,"reaction":"laugh"}]', 5, 23, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (35, '2021-04-30 12:23:32+02', 2, 'Check!!!!', '[]', 7, NULL, false, true, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (28, '2021-04-29 12:42:08+02', 7, 'Never change', '[{"userId":2,"reaction":"like"}]', 7, 12, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (41, '2021-04-30 13:43:20+02', 2, 'NO!', '[]', 7, 19, false, false, false, '[]', '[]');
INSERT INTO public.blog_comments (id, date, author_id, content, reactions, blog_id, parent_id, reported, deleted, edited, history, reports) VALUES (43, '2021-04-30 13:46:56+02', 2, 'test', '[]', 7, NULL, false, true, false, '[]', '[]');


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.blog_posts (id, date, author_id, content, tags, views, reactions, title, image) VALUES (4, '2021-04-29 12:07:19+02', 3, 'Here''s a list of some of the places I''d like to visit:

 ## Europe

1. Portugal
2. Italy
3. France
4. England
5. Sweden

~Spain~


## Asia

1. China
2. Japan
3. India
4. Sri Lanka
5.  ???

## South America
1. Brazil
2. Argentina
3. Paraguay
4. Ecuador 
5. ??

### Suggestions

Does anyone have any suggestions for some **good** places to go visit in Asia and South America? I''m missing one country from each', '["travel","advice","italy"]', 27, '[{"userId":5,"reaction":"like"},{"userId":7,"reaction":"like"},{"userId":2,"reaction":"laugh"},{"userId":4,"reaction":"like"},{"userId":6,"reaction":"laugh"}]', 'Places I''d like to visit', 'gigi-m_DoGWrKi_Q-unsplash.webp');
INSERT INTO public.blog_posts (id, date, author_id, content, tags, views, reactions, title, image) VALUES (5, '2021-04-29 12:15:04+02', 5, '# The Art Of War

Here is a *small* preview of my book - I hope you all enjoy it and can learn something. It''s available from all good booksellers near you!
(from https://en.wikipedia.org/wiki/The_Art_of_War )

------

Chapters:
1. First Calculations
2. Initiating Battle
3. Planning an Attack	
4. Forms to Perceive
5. The Disposition of Power

## 1. First Calculations

Explores the five fundamental factors (the Way, seasons, terrain, leadership, and management) and seven elements that determine the outcomes of military engagements. By thinking, assessing and comparing these points, a commander can calculate his chances of victory. Habitual deviation from these calculations will ensure failure via improper action. The text stresses that war is a very grave matter for the state and must not be commenced without due consideration.

## 2. Initiating Battle

Explains how to understand the economy of warfare and how success requires winning decisive engagements quickly. This section advises that successful military campaigns require limiting the cost of competition and conflict.

## 3. Planning an Attack

Defines the source of strength as unity, not size, and discusses the five factors that are needed to succeed in any war. In order of importance, these critical factors are: Attack, Strategy, Alliances, Army and Cities.

## 4. Forms to Perceive

Explains the importance of defending existing positions until a commander is capable of advancing from those positions in safety. It teaches commanders the importance of recognizing strategic opportunities, and teaches not to create opportunities for the enemy.

## 5. The Disposition of Power

Explains the use of creativity and timing in building an army''s momentum.

------

Let me know your thoughts!
', '["advice","war","art"]', 33, '[{"userId":5,"reaction":"like"},{"userId":7,"reaction":"like"},{"userId":2,"reaction":"heart"},{"userId":3,"reaction":"like"},{"userId":4,"reaction":"trophy"},{"userId":6,"reaction":"trophy"}]', 'Five Chapter Preview of my book', 'natalia-y-f5xddISq428-unsplash.webp');
INSERT INTO public.blog_posts (id, date, author_id, content, tags, views, reactions, title, image) VALUES (3, '2021-04-24 11:50:38+02', 6, '# Waterloo by Abba


My, my,
At Waterloo, Napoleon did surrender

Oh, yeah, 
And I have met my destiny in quite a similar way

The history book on the shelf Is always repeating itself

Waterloo
I was defeated, you won the war

Waterloo
Promise to love you forever more

Waterloo
Couldn''t escape if I wanted to

Waterloo
Knowing my fate is to be with you

Wa-Wa-Wa-Wa-Waterloo
Finally facing my Waterloo


My, my
I tried to hold you back, but you were stronger

Oh, yeah
And now it seems my only chance is giving up the fight

And how could I ever refuse 
I feel like I win when I lose', '["war","songs","victory"]', 13, '[{"userId":3,"reaction":"laugh"},{"userId":5,"reaction":"like"},{"userId":2,"reaction":"laugh"},{"userId":4,"reaction":"like"},{"userId":6,"reaction":"like"}]', 'My favourite song lyrics', 'europeana--F7h7BoDJgE-unsplash.webp');
INSERT INTO public.blog_posts (id, date, author_id, content, tags, views, reactions, title, image) VALUES (2, '2021-03-29 13:37:14+02', 4, '# A short history of Hannibal
From https://en.wikipedia.org/wiki/Hannibal

> &quot;Vincere scis, Hannibal; victoria uti nescis.&quot;

*Hannibal knew how to gain a victory, but not now to use it.*

## Battle of Trebia

Hannibal''s perilous march brought him into the Roman territory and frustrated the attempts of the enemy to fight out the main issue on foreign ground. His sudden appearance among the Gauls of the Po Valley, moreover, enabled him to detach those tribes from their new allegiance to the Romans before the Romans could take steps to check the rebellion. Publius Cornelius Scipio was the consul who commanded the Roman force sent to intercept Hannibal (he was also the father of Scipio Africanus). He had not expected Hannibal to make an attempt to cross the Alps, since the Romans were prepared to fight the war in the Iberian Peninsula. With a small detachment still positioned in Gaul, Scipio made an attempt to intercept Hannibal. He succeeded, through prompt decision and speedy movement, in transporting his army to Italy by sea in time to meet Hannibal. Hannibal''s forces moved through the Po Valley and were engaged in the Battle of Ticinus. Here, Hannibal forced the Romans to evacuate the plain of Lombardy, by virtue of his superior cavalry.[44] The victory was minor, but it encouraged the Gauls and Ligurians to join the Carthaginian cause. Their troops bolstered his army back to around 40,000 men. Scipio was severely injured, his life only saved by the bravery of his son who rode back onto the field to rescue his fallen father. Scipio retreated across the Trebia to camp at Placentia with his army mostly intact.[44]

The other Roman consular army was rushed to the Po Valley. Even before news of the defeat at Ticinus had reached Rome, the Senate had ordered Consul Tiberius Sempronius Longus to bring his army back from Sicily to meet Scipio and face Hannibal. Hannibal, by skillful maneuvers, was in position to head him off, for he lay on the direct road between Placentia and Arminum, by which Sempronius would have to march to reinforce Scipio. He then captured Clastidium, from which he drew large amounts of supplies for his men. But this gain was not without loss, as Sempronius avoided Hannibal''s watchfulness, slipped around his flank, and joined his colleague in his camp near the Trebia River near Placentia. There Hannibal had an opportunity to show his masterful military skill at the Trebia in December of the same year, after wearing down the superior Roman infantry, when he cut it to pieces with a surprise attack and ambush from the flanks.

## Battle of Lake Trasimene

Hannibal quartered his troops for the winter with the Gauls, whose support for him had abated. In the spring of 217 BC, Hannibal decided to find a more reliable base of operations farther south. Gnaeus Servilius and Gaius Flaminius (the new consuls of Rome) were expecting Hannibal to advance on Rome, and they took their armies to block the eastern and western routes that Hannibal could use.[45]

The only alternative route to central Italy lay at the mouth of the Arno. This area was practically one huge marsh, and happened to be overflowing more than usual during this particular season. Hannibal knew that this route was full of difficulties, but it remained the surest and certainly the quickest way to central Italy. Polybius claims that Hannibal''s men marched for four days and three nights "through a land that was under water", suffering terribly from fatigue and enforced want of sleep. He crossed without opposition over both the Apennines (during which he lost his right eye[46] because of conjunctivitis) and the seemingly impassable Arno, but he lost a large part of his force in the marshy lowlands of the Arno.[47]

He arrived in Etruria in the spring of 217 BC and decided to lure the main Roman army under Flaminius into a pitched battle by devastating the region that Flaminius had been sent to protect. As Polybius recounts, "he [Hannibal] calculated that, if he passed the camp and made a descent into the district beyond, Flaminius (partly for fear of popular reproach and partly of personal irritation) would be unable to endure watching passively the devastation of the country but would spontaneously follow him... and give him opportunities for attack."[48] At the same time, Hannibal tried to break the allegiance of Rome''s allies by proving that Flaminius was powerless to protect them. Despite this, Flaminius remained passively encamped at Arretium. Hannibal marched boldly around Flaminius'' left flank, unable to draw him into battle by mere devastation, and effectively cut him off from Rome (thus executing the first recorded turning movement in military history). He then advanced through the uplands of Etruria, provoking Flaminius into a hasty pursuit and catching him in a defile on the shore of Lake Trasimenus. There Hannibal destroyed Flaminius'' army in the waters or on the adjoining slopes, killing Flaminius as well (see Battle of Lake Trasimene). This was the most costly ambush that the Romans ever sustained until the Battle of Carrhae against the Parthian Empire.', '["italy","punic","war"]', 10, '[{"userId":3,"reaction":"like"},{"userId":5,"reaction":"laugh"},{"userId":7,"reaction":"laugh"},{"userId":2,"reaction":"like"},{"userId":4,"reaction":"like"},{"userId":6,"reaction":"like"}]', '"Vincere scis, Hannibal; victoria uti nescis."', 'federico-di-dio-photography-Z9aR-ewdQTc-unsplash.webp');
INSERT INTO public.blog_posts (id, date, author_id, content, tags, views, reactions, title, image) VALUES (6, '2021-05-01 10:31:36+02', 7, 'If you were wondering what the best places to visit in France were, then look no further than this list!

-----

# Good places

- Paris
- Lyon
- Nantes
- Marseille
- Toulouse

# Bad Places

- Corsica (it''s soooo **boring**)', '["travel","advice","france"]', 0, '[]', 'The Best Places to Visit in France', 'marc-olivier-jodoin--HIiNFXcbtQ-unsplash.webp');
INSERT INTO public.blog_posts (id, date, author_id, content, tags, views, reactions, title, image) VALUES (7, '2021-04-29 12:28:27+02', 2, 'These are the best names for cities in the world in order:

1. Alexandria
1. Alexandria
1. Alexandria
1. Alexandria
1. Alexandria
1. Alexandria
1. Alexandria
1. Alexandria
1. Alexandria
1. Alexandria
1. Alexandria

Thanks for reading', '["travel","war","art"]', 89, '[{"userId":3,"reaction":"laugh"},{"userId":4,"reaction":"laugh"},{"userId":5,"reaction":"laugh"},{"userId":6,"reaction":"laugh"},{"userId":7,"reaction":"laugh"}]', 'Great names for cities', 'ulvi-safari-WClG5w6GC9I-unsplash.webp');
INSERT INTO public.blog_posts (id, date, author_id, content, tags, views, reactions, title, image) VALUES (8, '2021-04-30 17:02:34+02', 15, 'Taken from https://en.wikipedia.org/wiki/Crossing_the_Rubicon

## Background

During the late Roman Republic, the river Rubicon marked the boundary between the Roman province of Cisalpine Gaul to the north-east and Italy proper (controlled directly by Rome and its allies) to the south. On the north-western side, the border was marked by the river Arno, a much wider and more important waterway, which flows westward from the Apennine Mountains (its source is not far from the Rubicon''s source) into the Tyrrhenian Sea.

Governors of Roman provinces were appointed promagistrates with imperium (roughly, "right to command") in one or more provinces. The governors then served as generals of the Roman army within the territory they ruled. Roman law specified that only the elected magistrates (consuls and praetors) could hold imperium within Italy. Any magistrate who entered Italy at the head of his troops forfeited his imperium and was therefore no longer legally allowed to command troops.

Exercising imperium when forbidden by the law was a capital offense. Furthermore, obeying the commands of a general who did not legally possess imperium was a capital offense. If a general entered Italy in command of an army, both the general and his soldiers became outlaws and were automatically condemned to death. Generals were thus obliged to disband their armies before entering Italy.

## Casting the Die

In January 50 BC C. Julius Caesar led a single legion, Legio XIII, south over the Rubicon from Cisalpine Gaul to Italy to make his way to Rome. In doing so, he deliberately broke the law on imperium and made armed conflict inevitable. Roman historian Suetonius depicts Caesar as undecided as he approached the river and attributes the crossing to a supernatural apparition. It was reported that Caesar dined with Sallust, Hirtius, Oppius, Lucius Balbus and Sulpicus Rufus on the night after his famous crossing into Italy on 10 January.[2]

According to Suetonius, Caesar uttered the famous phrase ālea iacta est ("the die has been cast").[3] The phrase "crossing the Rubicon" has survived to refer to any individual or group committing itself irrevocably to a risky or revolutionary course of action, similar to the modern phrase "passing the point of no return". Caesar''s decision for swift action forced Pompey, the consuls and a large part of the Roman Senate to flee Rome in fear.

', '[
  "italy", "war", "punic"
]', 6, '[]', 'Crossing the Rubicon', 'nicole-reyes-FRZ8jQ9j85U-unsplash.webp');
INSERT INTO public.blog_posts (id, date, author_id, content, tags, views, reactions, title, image) VALUES (9, '2021-04-28 18:19:05+02', 18, 'Taken from https://en.wikipedia.org/wiki/Hospital#History

## Pre-Middle Ages

In early India, Fa Xian, a Chinese Buddhist monk who travelled across India c. AD 400, recorded examples of healing institutions.[15] According to the Mahavamsa, the ancient chronicle of Sinhalese royalty, written in the sixth century AD, King Pandukabhaya of Sri Lanka (r. 437–367 BC) had lying-in-homes and hospitals (Sivikasotthi-Sala).[16] A hospital and medical training centre also existed at Gundeshapur, a major city in southwest of the Sassanid Persian Empire founded in AD 271 by Shapur I.[17] In ancient Greece, temples dedicated to the healer-god Asclepius, known as Asclepeion functioned as centres of medical advice, prognosis, and healing.[18] The Asclepeia spread to the Roman Empire. While public healthcare was non-existent in the Roman Empire, military hospitals called valetudinaria did exist stationed in military barracks and would serve the soldiers and slaves within the fort.[19] Evidence exists that some civilian hospitals, while unavailable to the Roman population, were occasionally privately built in extremely wealthy Roman households located in the countryside for that family, although this practice seems to have ended in 80 AD.[20]

## Middle Ages

The declaration of Christianity as an accepted religion in the Roman Empire drove an expansion of the provision of care. Following the First Council of Nicaea in AD 325 construction of a hospital in every cathedral town was begun, including among the earliest hospitals by Saint Sampson in Constantinople and by Basil, bishop of Caesarea in modern-day Turkey.[21] By the twelfth century, Constantinople had two well-organised hospitals, staffed by doctors who were both male and female. Facilities included systematic treatment procedures and specialised wards for various diseases.[22]

Medical knowledge was transmitted into the Islamic world through the Byzantine Empire.[23] The earliest general hospital in the Islamic world was built in 805 in Baghdad by Harun Al-Rashid.[24][25] By the 10th century, Baghdad had five more hospitals, while Damascus had six hospitals by the 15th century, and Córdoba alone had 50 major hospitals[when?], many exclusively for the military.[26] The Islamic bimaristan served as a center of medical treatment, as well nursing home and lunatic asylum. It typically treated the poor, as the rich would have been treated in their own homes.[27] Hospitals in this era were the first to require medical diplomas to license doctors, and compensation for negligence could be made.[28][additional citation(s) needed] Hospitals were forbidden by law to turn away patients who were unable to pay.[29][need quotation to verify] These hospitals were financially supported by waqfs,[29] as well as state funds.[26]

## Early Modern Era

In Europe the medieval concept of Christian care evolved during the sixteenth and seventeenth centuries into a secular one. In England, after the dissolution of the monasteries in 1540 by King Henry VIII, the church abruptly ceased to be the supporter of hospitals, and only by direct petition from the citizens of London, were the hospitals St Bartholomew''s, St Thomas''s and St Mary of Bethlehem''s (Bedlam) endowed directly by the crown; this was the first instance of secular support being provided for medical institutions.

Pennsylvania Hospital (now part of University of Pennsylvania Health System). Founded in 1751, it is the earliest established public hospital in the United States.[32][33][a] It is also home to America''s first surgical amphitheatre and its first medical library.
The voluntary hospital movement began in the early 18th century, with hospitals being founded in London by the 1720s, including Westminster Hospital (1719) promoted by the private bank C. Hoare & Co and Guy''s Hospital (1724) funded from the bequest of the wealthy merchant, Thomas Guy.

Other hospitals sprang up in London and other British cities over the century, many paid for by private subscriptions. St Bartholomew''s in London was rebuilt from 1730 to 1759,[34] and the London Hospital, Whitechapel, opened in 1752.

These hospitals represented a turning point in the function of the institution; they began to evolve from being basic places of care for the sick to becoming centres of medical innovation and discovery and the principal place for the education and training of prospective practitioners. Some of the era''s greatest surgeons and doctors worked and passed on their knowledge at the hospitals.[35] They also changed from being mere homes of refuge to being complex institutions for the provision of medicine and care for sick. The Charité was founded in Berlin in 1710 by King Frederick I of Prussia as a response to an outbreak of plague.

The concept of voluntary hospitals also spread to Colonial America; the Bellevue Hospital opened in 1736 (as a workhouse, then later becoming a hospital); the Pennsylvania Hospital opened in 1752, New York Hospital[36] in 1771, and Massachusetts General Hospital in 1811.

When the Vienna General Hospital opened in 1784 (instantly becoming the world''s largest hospital), physicians acquired a new facility that gradually developed into one of the most important research centres.[37]

Another Enlightenment era charitable innovation was the dispensary; these would issue the poor with medicines free of charge. The London Dispensary opened its doors in 1696 as the first such clinic in the British Empire. The idea was slow to catch on until the 1770s,[38] when many such organisations began to appear, including the Public Dispensary of Edinburgh (1776), the Metropolitan Dispensary and Charitable Fund (1779) and the Finsbury Dispensary (1780). Dispensaries were also opened in New York 1771, Philadelphia 1786, and Boston 1796.[39]

The Royal Naval Hospital, Stonehouse, Plymouth, was a pioneer of hospital design in having "pavilions" to minimize the spread of infection. John Wesley visited in 1785, and commented "I never saw anything of the kind so complete; every part is so convenient, and so admirably neat. But there is nothing superfluous, and nothing purely ornamented, either within or without." This revolutionary design was made more widely known by John Howard, the philanthropist. In 1787 the French government sent two scholar administrators, Coulomb and Tenon, who had visited most of the hospitals in Europe.[40] They were impressed and the "pavilion" design was copied in France and throughout Europe.', '["war","history"]', 1, '[{"userId":15,"reaction":"like"}]', 'A short history of hospitals', 'museums-victoria-5g3m1WPjrLI-unsplash.webp');


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.session (sid, sess, expire) VALUES ('_oO8MUfZOpJNongE2U4MRIWYmCdSJq4e', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":false,"path":"/"},"passport":{}}', '2021-05-01 10:53:19');
INSERT INTO public.session (sid, sess, expire) VALUES ('-ko9v0OqtlA35hIAnc_4IbX41GSHr5rf', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":false,"path":"/"},"passport":{"user":15}}', '2021-05-01 17:28:22');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (2, 'AlexanderTheGreat', '50b0717e68b19e814525322eaeb58ee51378dd8ec72bfd4976cd8be337cb91690bfdaf4604bf928156924895c4f24236d2f307b016f8ca14964109eebff6f53e', 'a4b97b2176cf4d', 'alexander@greece.com', true);
INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (3, 'Motecuzoma', 'cf939086d29eef42290bb82e4ac5d15e95811804c2aabaae0dfa4521060edffb56a1001d8fb9511d245f57d2d8c6e69ae560e8c9b6d9a0e4e48a508c71575400', '6fcb6536c75c1d', 'aztecking@mexico.com', true);
INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (4, 'GustavusAdolphus', '76a62b44bb133cc4f4495f2fa8d96b945bbf9e53a835fa0746f53b046905de09637ca808623e12a61d8414aef5ab8234b93aa4cc8acedf64e4df36665deda477', '08ae9f00bafc99', 'europeanpower@sweden.com', true);
INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (5, 'SunTzu', 'f20769f3982a7c02c2e5640cb5eaf5126ecd5854b12ed49f8638aa7c66ffcd473cf8cf3f97799adb3e067256818c3cc9be56671813b1e29d9ead3f781ce2a596', '5ffabf910055a2', 'greatwall@china.com', true);
INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (6, 'ArthurWellesley', 'aa2dae64220362a32faa0e85c0dcd8ac68e7960e02008b361251b02dc0c518fd03d183caa10b3758090cfcb3a4e6ae65449dd3cbec601b2ef872b25e17205322', 'd47239c85049ae', 'waterloo@duke.com', true);
INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (7, 'Napoleon', '1ccb20f28f0aaca3ed8124d72f151fdf28073c67f8cfd3154c01d805c2727e6db57cdcaacdc0e20fd915f01f75f088ad314dc7dd0a0813a360f33b6c34f05856', 'cb8b55728e7aa2', 'corsicasucks@france.com', true);
INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (15, 'JuliusCaesar', 'c2a926e0dfb746475486091ebe1380ec4becc54daec5ac0451b4e5a8ff73b79ef03aa78259783bfe7053409108c8314101adee32b2bff05abf51a0c5dbf5c7e1', '126ffbc0f4c7d9', 'empire@rome.com', false);
INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (16, 'AlbertEinstein', '90c5deb23c12f2409e716c91c90436eb6870c88c29e8216574006b425e8f8d14c21c3a530ea1b159622032fbf7b1befaf40b6fea8d0236a02900cced3c15652b', '3a0c4a60d4cd84', 'e=mc2@germany.com', false);
INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (17, 'MarieAntoinette', '2a754da4b2e932b2a199263f80cfe9284a53cb03a44c5ee3181e88a0cb9e302ccf4ce84565cd09f94626e863cee52d25b2a8a44507bcdc9dd09daeef4c3890b9', '176740ff2accac', 'marie@versailles.com', false);
INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (18, 'FlorenceNightingale', '358084e33a5326380e4426f10203ef946698f69b4de904e9d54e68de148fc6fba7838b6bf7e7e0103373fc9e5aa926e196c7d014b88bf67f7c5f3b08389687d4', '6175a39c90a8df', 'florence@nhs.com', false);
INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (19, 'MarieCurie', '044fae89b0ac16e8b6832303968a3fab95f51f5bec25a92d1f8a3a01295eb7b5c83d982c11887ce2f570c05f01b7dbb3c857f21525e9a22dcab14595923a8b73', '3fef41a162e429', 'marie@curieinstitute.com', false);
INSERT INTO public.users (id, username, supersecretword, salt, email, admin) VALUES (20, 'Boudicca', '246f1b8b88697f7ba32f71a4d23ea098a9bb8da3f0fb9fe5504083be94b04c34bc1ecaa164889dc65a7a8e0baf9a2a6ae4a38ecce32306bf4ee86de6f0af500f', 'b9f1bb80ed1c15', 'boudicca@iceni.com', false);


--
-- Name: blog_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blog_comments_id_seq', 46, true);


--
-- Name: blog_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blog_posts_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 20, true);


--
-- Name: blog_comments blog_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT blog_comments_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: blog_comments blog_comments_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT blog_comments_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: blog_comments blog_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT blog_fk FOREIGN KEY (blog_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;


--
-- Name: blog_posts blog_posts_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

