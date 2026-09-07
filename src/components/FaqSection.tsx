import { motion, Variants } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Note on provenance: these answers were written in Kinyarwanda by the team.
 * rw.json holds the original wording; en.json and fr.json are translated from
 * it, which is the reverse of the usual direction in this project.
 */
const FAQ_KEYS = ["problem", "technology", "customers", "businesses"] as const;

const FaqSection = () => {
  const { t } = useTranslation();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="faq" className="py-24 bg-background border-t border-border/60">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4 mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5" />
              {t("faq.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              {t("faq.title")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {t("faq.description")}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {FAQ_KEYS.map((key) => (
                <AccordionItem
                  key={key}
                  value={key}
                  className="border border-border rounded-2xl px-5 bg-card shadow-sm data-[state=open]:border-primary/40 transition-colors"
                >
                  <AccordionTrigger className="text-left text-base sm:text-lg font-bold hover:no-underline py-5">
                    {t(`faq.items.${key}.q`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-5">
                    {t(`faq.items.${key}.a`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
