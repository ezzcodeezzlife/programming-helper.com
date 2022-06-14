import {
  AnnotationIcon,
  DatabaseIcon,
  ClockIcon,
  ChipIcon,
  TranslateIcon,
  CodeIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline"

export default function Features(props: any) {
  const features = [
    {
      name: "Function from Description",
      description:
        "Generate a function just by describing what is needs to do. Choose of many programming languages.",
      icon: GlobeAltIcon,
      link: "/generate-function",
    },
    {
      name: "Text Description to SQL Command",
      description: "Create a SQL command from a description.",
      icon: DatabaseIcon,
      link: "/text-to-sql-syntax",
    },
    {
      name: "Translate Languages",
      description: "Translate code to any programming language.",
      icon: TranslateIcon,
      link: "/translate",
    },
    {
      name: "Generate HTML from Description",
      description: "Generate small HTML from Description.",
      icon: CodeIcon,
      link: "/generate-html-from-description",
    },
    {
      name: "Code to Explanation",
      description: "Any code explained in plain english.",
      icon: CodeIcon,
      link: "/code-to-explanation",
    },
    {
      name: "Fix invalid Code",
      description:
        "To spot a missing character somewhere can be frustrating. This feature will help you to fix it.",
      icon: LightningBoltIcon,
      link: "/fix-invalid-code",
    },

    {
      name: "Get Test for Code",
      description:
        "This feature will help you to create tests for your code.",
      icon: LightningBoltIcon,
      link: "/tests",
    },



    {
      name: "Class from Description",
      description:
        "Generate a class just by describing what is needs to do. Choose of many programming languages.",
      icon: CodeIcon,
      link: "/class-from-description",
    },

    {
      name: "Regex from Description",
      description: 'Create a regex from a description like "check for email".',
      icon: CodeIcon,
      link: "/regex",
    },
    {
      name: "Regex to Explanation",
      description: "Create a plain english explanation from a regex.",
      icon: CodeIcon,
      link: "/regex-explanation",
    },

    {
      name: "Git Command from Description",
      description:
        "Find the Git Command you are looking for from a description.",
      icon: AnnotationIcon,
      link: "/git",
    },
    {
      name: "Linux Command",
      description: "Get the linux command from a description. ",
      icon: ChipIcon,
      link: "/linux",
    },
    {
      name: "Function from Docstring",
      description: "Provide a docstring to generate the actual function.",
      icon: AnnotationIcon,
      link: "/docstring",
    },

    {
      name: "Add typing to code",
      description: "This feature will help you to add typing to your code.",
      icon: CodeIcon,
      link: "/typings",
    },

    {
      name: "Get Language from Code",
      description: "Get the programming language from a code.",
      icon: TranslateIcon,
      link: "/language-from-code",
    },
    

    {
      name: "Time complexity",
      description: "Get time complexity.",
      icon: ClockIcon,
      link: "/time-complexity",
    },

    {
      name: "CSS from Description",
      description: "Generate CSS from Description.",
      icon: AnnotationIcon,
      link: "/css-from-description",
    },
    {
      name: "Meta Tags from Description",
      description: "Generate Meta Tags from a Description.",
      icon: CodeIcon,
      link: "/meta",
    },
  ]

  return (
    <div id="features" className="mt-10">
      <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {features.map((feature) => (
          <a href={feature.link}>
            <div
              key={feature.name}
              className="relative  hover:bg-slate-100 p-2 rounded-md py-2"
            >
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {feature.description}
              </dd>
            </div>
          </a>
        ))}
      </dl>
    </div>
  )
}
