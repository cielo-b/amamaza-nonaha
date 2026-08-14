import { describe, it, expect, beforeEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { Trans, useTranslation } from "react-i18next";

import i18n from "@/i18n/config";
import en from "@/i18n/locales/en.json";
import rw from "@/i18n/locales/rw.json";
import fr from "@/i18n/locales/fr.json";

type Nested = { [key: string]: string | Nested };

const flatten = (obj: Nested, prefix = ""): Record<string, string> =>
  Object.entries(obj).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") acc[path] = value;
    else Object.assign(acc, flatten(value, path));
    return acc;
  }, {});

const locales = {
  en: flatten(en as Nested),
  rw: flatten(rw as Nested),
  fr: flatten(fr as Nested),
};

// English is the source of truth; the other locales are checked against it.
const translated = ["rw", "fr"] as const;

describe("locale files", () => {
  it.each(translated)("%s has exactly the same keys as en", (lng) => {
    expect(Object.keys(locales[lng]).sort()).toEqual(Object.keys(locales.en).sort());
  });

  it.each(["en", ...translated] as const)("%s has no blank values", (lng) => {
    const blank = Object.entries(locales[lng])
      .filter(([, value]) => value.trim() === "")
      .map(([key]) => key);
    expect(blank).toEqual([]);
  });

  it.each(translated)("%s keeps every interpolation placeholder from en", (lng) => {
    const placeholders = (value: string) => (value.match(/{{\s*\w+\s*}}/g) ?? []).sort();
    const mismatched = Object.keys(locales.en).filter(
      (key) =>
        placeholders(locales[lng][key]).join() !== placeholders(locales.en[key]).join(),
    );
    expect(mismatched).toEqual([]);
  });

  it.each(translated)("%s keeps the <accent> markup balanced wherever en uses it", (lng) => {
    const markupKeys = Object.keys(locales.en).filter((key) =>
      locales.en[key].includes("<accent>"),
    );
    expect(markupKeys.length).toBeGreaterThan(0);
    markupKeys.forEach((key) => {
      const value = locales[lng][key];
      expect(value, `${lng}.${key}`).toContain("<accent>");
      expect(value, `${lng}.${key}`).toContain("</accent>");
    });
  });
});

// Mirrors BrandVideoSection: `t` is threaded into Trans so the headline follows
// language changes (Trans on its own does not subscribe to them), and the mapped
// component drops react-i18next's internal `i18nIsDynamicList` flag.
const Accent = ({
  i18nIsDynamicList: _ignored,
  ...props
}: React.ComponentProps<"em"> & { i18nIsDynamicList?: boolean }) => <em {...props} />;

const Headline = () => {
  const { t } = useTranslation();
  return (
    <h2>
      <Trans t={t} i18nKey="brandVideo.title" components={{ accent: <Accent /> }} />
    </h2>
  );
};

const LiveTag = () => {
  const { t } = useTranslation();
  return <span>{t("campaigns.liveTag")}</span>;
};

describe("switching language", () => {
  beforeEach(async () => {
    await act(async () => {
      await i18n.changeLanguage("en");
    });
  });

  it("renders the headline with per-language emphasis", async () => {
    render(<Headline />);

    expect(screen.getByRole("heading")).toHaveTextContent("No visibility equals no growth.");
    expect(screen.getByText("growth").tagName).toBe("EM");

    await act(async () => {
      await i18n.changeLanguage("rw");
    });
    // The Kinyarwanda "nta X, nta Y" construction, not English word order.
    expect(screen.getByRole("heading")).toHaveTextContent("Nta kugaragara, nta terambere.");
    expect(screen.getByText("terambere").tagName).toBe("EM");

    await act(async () => {
      await i18n.changeLanguage("fr");
    });
    expect(screen.getByRole("heading")).toHaveTextContent("Pas de visibilité, pas de croissance.");
    expect(screen.getByText("croissance").tagName).toBe("EM");
  });

  it("re-renders campaign labels in place, without a reload", async () => {
    render(<LiveTag />);
    expect(screen.getByText("Live campaign")).toBeInTheDocument();

    await act(async () => {
      await i18n.changeLanguage("rw");
    });
    expect(screen.getByText("Igikorwa kiriho")).toBeInTheDocument();

    await act(async () => {
      await i18n.changeLanguage("fr");
    });
    expect(screen.getByText("Campagne en direct")).toBeInTheDocument();
  });
});
