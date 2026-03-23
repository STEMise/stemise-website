import { Navigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import CurriculumReader from "@/components/curriculum/CurriculumReader";
import { getCurriculumAgeGroupBySlug } from "@/lib/curriculum-content";
import { useSiteContentQuery } from "@/lib/site-content";

const CurriculumDetail = () => {
  const { slug } = useParams();
  const { data: ageGroups } = useSiteContentQuery("curriculum_age_groups");
  const { data: curriculumPages } = useSiteContentQuery("curriculum_pages");
  const curriculum = slug ? curriculumPages.find((entry) => entry.slug === slug) : undefined;
  const ageGroup = curriculum ? getCurriculumAgeGroupBySlug(ageGroups, curriculum.ageGroupSlug) : undefined;

  if (!curriculum || !ageGroup) {
    return <Navigate to="/curriculum" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={curriculum.title}
        description={curriculum.subtitle}
        pathname={`/curriculum/${curriculum.slug}`}
      />
      <Header />
      <main className="section-shell">
        <div className="container">
          <CurriculumReader curriculum={curriculum} ageGroup={ageGroup} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CurriculumDetail;
