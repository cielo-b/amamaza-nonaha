import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Keeps the document in sync with the active language.
 *
 * `<html lang>` is what screen readers use to pick a pronunciation and what
 * search engines use to index the page, so leaving it at the build-time "en"
 * misrepresents the Kinyarwanda and French versions of the site.
 */
export const useDocumentLanguage = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = t("meta.title");

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", t("meta.description"));

    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle?.setAttribute("content", t("meta.title"));

    const ogDescription = document.querySelector('meta[property="og:description"]');
    ogDescription?.setAttribute("content", t("meta.description"));
  }, [t, i18n.language]);
};
