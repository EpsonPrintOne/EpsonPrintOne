import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const commonFields = {
  title: z.string(),
  description: z.string(),
  meta_title: z.string().optional(),
  date: z.coerce.date().optional(),
  image: z.string().optional(),
  draft: z.boolean(),
};

export const about = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/about",
  }),
  schema: z.object({
    ...commonFields,
    about: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
    }),
    goal: z.object({
      name: z.string(),
      description: z.string(),
      avatar: z.string(),
      designation: z.string(),
    }),
    lists: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
    funfacts: z.object({
      title: z.string(),
      lists: z.array(
        z.object({
          icon: z.string(),
          value: z.number(),
          unit: z.string(),
          content: z.string(),
        }),
      ),
    }),
    services: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
      }),
    ),
    office_culture: z.object({
      enable: z.boolean(),
      title: z.string(),
      content: z.string(),
      images: z.array(
        z.object({
          image: z.string(),
        }),
      ),
      join_our_team: z.object({
        title: z.string(),
        content: z.string(),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    }),
  }),
});

export const authors = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/authors",
  }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string().optional(),
    social: z
      .array(
        z.object({
          icon: z.string(),
          name: z.string(),
          link: z.string(),
        }),
      )
      .optional(),
  }),
});

export const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/blog",
  }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string().optional(),
    author: z.string().optional(),
    type: z.enum(["regular", "featured"]).optional(),
  }),
});

export const career = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/career",
  }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string().optional(),
    job_nature: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const caseStudy = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/case-study",
  }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string().optional(),
    call_to_action: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        description: z.string(),
        image: z.string(),
        button: z.object({
          label: z.string(),
          link: z.string(),
          enable: z.boolean(),
        }),
      })
      .optional(),
  }),
});

export const contact = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/contact",
  }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string(),
    contact_details: z
      .object({
        heading: z.string(),
        phone: z.string(),
        mail: z.string(),
        address: z.string(),
      })
      .optional(),
  }),
});

export const faq = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/faq",
  }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string(),
    faq_list: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    ),
  }),
});

export const homepage = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/homepage",
  }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      conclusion: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
    brands_images: z.object({
      title: z.string(),
      lists: z.array(
        z.object({
          image: z.string(),
          alt: z.string(),
        }),
      ),
    }),
    feature: z.object({
      title: z.string(),
      description: z.string(),
      button: z.object({
        label: z.string(),
        link: z.string(),
        enable: z.boolean(),
      }),
      features: z.array(
        z.object({
          name: z.string(),
          icon: z.string(),
          content: z.string(),
        }),
      ),
    }),
    workflow: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
      video_id: z.string(),
    }),
    services: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        slider_images: z.array(z.string()),
      }),
    ),
    integrate: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      tools: z.array(z.string()),
    }),
    annoucement: z.object({
      image: z.string(),
      title: z.string(),
      description: z.string(),
      button: z.object({
        label: z.string(),
        link: z.string(),
        enable: z.boolean(),
      }),
    }),
  }),
});

export const howItWorks = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/how-it-works",
  }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string(),
    banner: z.object({
      title: z.string(),
      image: z.string(),
      content: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
    intro_video: z.object({
      enable: z.boolean(),
      title: z.string(),
      content: z.string(),
      video_id: z.string(),
      video_thumbnail: z.string(),
    }),
    how_it_works: z.object({
      enable: z.boolean(),
      blocks: z.array(
        z.object({
          title: z.string(),
          image: z.string(),
          content: z.string(),
        }),
      ),
    }),
  }),
});

export const pages = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/pages",
  }),
  schema: z.object({
    ...commonFields,
  }),
});

export const pricing = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/pricing",
  }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string(),
    pricing_list: z.array(
      z.object({
        name: z.string(),
        currency: z.string(),
        price: z.string(),
        price_per: z.string(),
        info: z.string(),
        recommended: z.boolean(),
        services: z.array(z.string()),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ),
    faq: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      questions: z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      ),
    }),
    call_to_action: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      image: z.string(),
      button: z.object({
        label: z.string(),
        link: z.string(),
        enable: z.boolean(),
      }),
    }),
  }),
});

export const products = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/products",
  }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string().optional(),
    icon: z.string().optional(),
    banner: z
      .object({
        title: z.string(),
        has_color: z.boolean(),
        image: z.string(),
        content: z.string(),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      })
      .optional(),
    about_this_product: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        content: z.string(),
        features: z.array(
          z.object({
            title: z.string(),
            icon: z.string(),
            content: z.string(),
          }),
        ),
      })
      .optional(),
    product_info: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        content: z.string(),
        features: z.array(
          z.object({
            image: z.string(),
            content: z.string(),
          }),
        ),
      })
      .optional(),
    intro_video: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        content: z.string(),
        video_id: z.string(),
        video_thumbnail: z.string(),
        background_class: z.string(),
      })
      .optional(),
    services: z
      .object({
        enable: z.boolean(),
        block: z.array(
          z.object({
            title: z.string(),
            slider_images: z.array(z.string()),
            description: z.string(),
          }),
        ),
      })
      .optional(),
    call_to_action: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        description: z.string(),
        button: z.object({
          label: z.string(),
          link: z.string(),
          enable: z.boolean(),
        }),
      })
      .optional(),
  }),
});

export const team = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/team",
  }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string(),
    team_members: z.array(
      z.object({
        name: z.string(),
        designation: z.string(),
        image: z.string(),
        social_profile: z.array(
          z.object({
            name: z.string(),
            icon: z.string(),
            link: z.string(),
          }),
        ),
      }),
    ),
  }),
});
