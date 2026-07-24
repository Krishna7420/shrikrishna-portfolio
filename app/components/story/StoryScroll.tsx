"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Story = {
  marathi: string;
  titleMarathi: string;
  titleEnglish: string;
  bodyMarathi: string;
  bodyEnglish: string;
  image: string;
  side: "left" | "right";
};

const stories: Story[] = [
  {
    marathi: "विठ्ठल (श्रीकृष्ण)",
    titleMarathi: "द्वारिकेचा अधिपती",
    titleEnglish: "Lord of Dwaraka",
    bodyMarathi:
      "विठ्ठल, ज्याला विठोबा किंवा पांडुरंग असेही म्हणतात, तो प्रत्यक्ष द्वारकाधीश श्रीकृष्णच मानला जातो. अशी श्रद्धा आहे की तो आपला भक्त पुंडलिकासमोर प्रकट झाला — जो त्यावेळी आपल्या वृद्ध आई-वडिलांची सेवा करत होता आणि त्याने प्रभूला थोडा वेळ थांबण्याची विनंती केली. विठ्ठल पुंडलिकाने फेकलेल्या विटेवर धीराने उभा राहिला, आणि तेव्हापासून पंढरपूर या गावात, कमरेवर हात ठेवून, तो तसाच उभा आहे.",
    bodyEnglish:
      "Vitthal, also known as Vithoba or Panduranga, is regarded as none other than Lord Krishna himself — the Dwarakadhish, Lord of Dwaraka. Tradition holds that he appeared before his devotee Pundalik, who was tending to his elderly parents and asked the Lord to wait a moment. Vitthal stood patiently on the brick Pundalik tossed him, and has remained standing there ever since — hands resting on his hips — in the town of Pandharpur.",
    image: "/festival/vitthal.png",
    side: "right",
  },
  {
    marathi: "रुक्मिणी",
    titleMarathi: "विदर्भ राजकन्या",
    titleEnglish: "Princess of Vidarbha",
    bodyMarathi:
      "रुक्मिणी ही विदर्भ — आजच्या महाराष्ट्रातील एक प्राचीन राज्य — येथील राजकन्या होती, जी पुढे श्रीकृष्णाची प्रमुख पत्नी बनली आणि देवी लक्ष्मीचा अवतार मानली जाते. पंढरपूरच्या मंदिरात ती विठ्ठलाशेजारी स्वतःच्या स्वतंत्र गाभाऱ्यात पूजली जाते, आणि वारकरी परंपरेतील भक्तिगीत व वारीच्या प्रवासात तिचे स्थान अत्यंत महत्त्वाचे आहे.",
    bodyEnglish:
      "Rukmini was the princess of Vidarbha — a kingdom in present-day Maharashtra — before becoming Krishna's principal queen, believed to be an incarnation of the goddess Lakshmi. At the temple in Pandharpur she is worshipped in her own shrine beside Vitthal, and her presence is central to the Warkari tradition of devotional singing and pilgrimage that continues to this day.",
    image: "/festival/rukmini.png",
    side: "left",
  },
  {
    marathi: "चंद्रभागा",
    titleMarathi: "चंद्रकोरीची नदी",
    titleEnglish: "The Chandrabhaga River",
    bodyMarathi:
      "चंद्रभागा ही भीमा नदीचे स्थानिक नाव असून ती पंढरपूरमधून चंद्रकोरीच्या आकारात वाहते — यावरूनच तिला 'चंद्रभागा' हे नाव मिळाले आहे. मंदिरात प्रवेश करण्यापूर्वी वारकरी तिच्या पवित्र पाण्यात स्नान करतात, आणि नदीलाही मंदिराइतकेच पवित्र मानतात.",
    bodyEnglish:
      "The Chandrabhaga, a local name for the Bhima river, curves through Pandharpur in the shape of a crescent moon — which is how it earned its name, 'moon-arc.' Before entering the temple, pilgrims bathe in its waters, considering the river every bit as sacred as the shrine itself.",
    image: "/festival/chandrabhaga.png",
    side: "right",
  },
  {
    marathi: "मंदिर",
    titleMarathi: "मंदिराची वास्तुकला",
    titleEnglish: "The Temple's Architecture",
    bodyMarathi:
      "पंढरपूरचे विठ्ठल-रुक्मिणी मंदिर अनेक शतकांमध्ये विकसित झाले असून त्याचे सर्वात जुने भाग मध्ययुगीन यादव कालखंडातील आहेत, तर मराठा कालखंडातही त्यात भर पडत राहिली. काळ्या बेसाल्ट दगडात हेमाडपंथी शैलीत बांधलेल्या या मंदिराला टप्प्याटप्प्याचे शिखर, दर्शनासाठी वारकरी जमतात असा खुला सभामंडप, आणि विठ्ठलाच्या वाहनाची प्रतिमा असलेला गरुड मंडप आहे.",
    bodyEnglish:
      "The Vitthal-Rukmini temple at Pandharpur has grown over many centuries, with its oldest sections dating to the medieval Yadava period and additions continuing through the Maratha era. Built largely from black basalt stone in the Hemadpanthi style, it features a stepped shikhara (spire), an open sabha mandap (assembly hall) where pilgrims gather for darshan, and a Garud Mandap housing an image of Vitthal's divine vehicle.",
    image: "/festival/Temple.png",
    side: "left",
  },
];

function StorySection({ story, color, index }: { story: Story; color: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    story.side === "left" ? [-5, 0, 5] : [5, 0, -5]
  );
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.03, 0.9]);
  const textX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    story.side === "left" ? [40, 0, -20] : [-40, 0, 20]
  );
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.25, 0.05]);

  return (
    <div
  ref={ref}
  className={`relative mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center gap-10 overflow-hidden px-4 py-20 sm:px-6 md:gap-16 ${
    story.side === "left" ? "md:flex-row-reverse" : "md:flex-row"
  }`}
>
      <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${story.side === "left" ? "20%" : "80%"} 50%, ${color}, transparent 60%)`,
          }}
        />
      </motion.div>

      <span
        className="pointer-events-none absolute hidden select-none font-black opacity-[0.07] md:block"
        style={{
          fontSize: "16rem",
          color,
          top: "50%",
          left: story.side === "left" ? "auto" : "5%",
          right: story.side === "left" ? "5%" : "auto",
          transform: "translateY(-50%)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <motion.div
        style={{ y: imageY, rotate: imageRotate, scale: imageScale }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-xs shrink-0 md:w-2/5"
      >
        <div
          className="relative overflow-hidden rounded-[32px] border-2 bg-black/40"
          style={{ borderColor: `${color}50`, boxShadow: `0 0 60px ${color}30` }}
        >
          <img
            src={story.image}
            alt={story.titleEnglish}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
          className="pointer-events-none absolute -inset-4 -z-10 hidden rounded-[40px] opacity-40 md:block"
          style={{ background: `conic-gradient(from 0deg, transparent, ${color}, transparent 55%)` }}
        />

        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.35, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
          className="pointer-events-none absolute -inset-4 -z-20 rounded-[40px] border"
          style={{ borderColor: `${color}50` }}
        />
      </motion.div>

      <motion.div
        style={{ x: textX }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 text-center md:text-left"
      >
        <motion.span
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-3 block text-4xl font-black sm:text-6xl"
          style={{ color }}
        >
          {story.marathi}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-5 flex flex-col items-center gap-1 md:items-start"
        >
          <h3 className="text-xl font-semibold sm:text-2xl">{story.titleMarathi}</h3>
          <span className="h-px w-10 opacity-50" style={{ backgroundColor: color }} />
          <h4 className="text-base font-medium text-zinc-400 sm:text-lg">{story.titleEnglish}</h4>
        </motion.div>

        {/* Marathi body */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mb-4 max-w-md text-base leading-8 text-zinc-200 md:mx-0"
        >
          {story.bodyMarathi}
        </motion.p>

        {/* Divider */}
        <div className="mx-auto mb-4 flex max-w-md items-center gap-3 md:mx-0">
          <span className="h-px flex-1 opacity-20" style={{ backgroundColor: color }} />
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">English</span>
          <span className="h-px flex-1 opacity-20" style={{ backgroundColor: color }} />
        </div>

        {/* English body */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto max-w-md text-sm leading-7 text-zinc-400 md:mx-0"
        >
          {story.bodyEnglish}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function StoryScroll({ color }: { color: string }) {
  return (
    <section className="relative py-16">
      <motion.h2
        initial={{ opacity: 0, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-8 text-center text-3xl font-bold sm:text-4xl"
      >
        The Story Behind the Pilgrimage
      </motion.h2>

      {stories.map((story, i) => (
        <StorySection key={story.titleEnglish} story={story} color={color} index={i} />
      ))}
    </section>
  );
}