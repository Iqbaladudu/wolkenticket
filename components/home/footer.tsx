import Footer, { FooterColumn } from "../ui/footer";

const MainFooter: React.FC = () => {
  const footerColumns: FooterColumn[] = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Releases", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
  ];

  return (
    <Footer
      columns={footerColumns}
      socialLinks={{
        github: "https://github.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
      }}
      variant="light"
    />
  );
};

export default MainFooter;
