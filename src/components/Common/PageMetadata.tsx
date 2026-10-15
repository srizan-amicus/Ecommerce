import { useEffect } from "react";

interface PageMetadataProps {
  title: string;
  description: string;
}

function PageMetadata({ title, description }: PageMetadataProps) {
  useEffect(() => {
    const previousTitle = document.title;

    const descriptionElement = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    const createdDescription = !descriptionElement;

    const metaDescription =
      descriptionElement ?? document.createElement("meta");

    if (createdDescription) {
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    document.title = title;
    metaDescription.content = description;

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        metaDescription.remove();
      }
    };
  }, [title, description]);

  return null;
}

export default PageMetadata;
