"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { termsService } from "@/services/api/terms";
import type { TermsDocument } from "@/services/api/terms/types";
import { useTextLibrary } from "@/hooks/use.text.library";

export default function CommunityGuidelinesPage() {
  const { language, t } = useLanguage();
  const textLibrary = useTextLibrary();
  const [communityGuidelines, setCommunityGuidelines] =
    useState<TermsDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    textLibrary.date.setCapitalize(false);
    let isMounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await termsService.getTerms(language);
        if (isMounted) {
          setCommunityGuidelines(data.terms.communityGuidelines);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(
            t(
              "Unable to load community guidelines. Check your internet connection and try again."
            )
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [language, textLibrary, t]);

  const handlePreChangeLanguage = () => {
    // Pode fazer qualquer lógica antes de trocar de idioma (sync ou async).
    // Mantemos os dados atuais enquanto a nova língua carrega.
    setLoading(true);
  };

  if (!communityGuidelines) {
    return (
      <main>
        <p>{error ? error : t("Loading community guidelines...")}</p>
      </main>
    );
  }

  const updatedAt = communityGuidelines?.metadata.updatedAt
    ? `${t("Updated")} ${textLibrary.date.toRelativeTime(
        new Date(communityGuidelines.metadata.updatedAt)
      )}`
    : "";

  return (
    <main>
      <header>
        <h1>{communityGuidelines?.title}</h1>
        <p>
          <span>{communityGuidelines?.metadata.author}</span>
          <span> · </span>
          <span>
            {t("Version")} {communityGuidelines?.metadata.version}
          </span>
          {updatedAt && <span> · {updatedAt}</span>}
        </p>
      </header>

      <section>
        {communityGuidelines?.body.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>

            {section.paragraphs.map((paragraph, index) => {
              if (typeof paragraph === "string") {
                return (
                  <p key={index}>{paragraph}</p>
                );
              }

              return (
                <div key={index}>
                  <p>{paragraph.text}</p>

                  {paragraph.topics && paragraph.topics.length > 0 && (
                    <ul>
                      {paragraph.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>{topic}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </article>
        ))}
      </section>
    </main>
  );
}


