import { Navigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import CurriculumAgeGroupView from "@/components/curriculum/CurriculumAgeGroupView";
import {
  getCurriculumAgeGroupBySlug,
  getCurriculumPagesByAgeGroup,
} from "@/lib/curriculum-content";
import { useSiteContentQuery } from "@/lib/site-content";

const CurriculumAgeGroup = () => {
  const { ageGroup } = useParams();
  const { data: ageGroups } = useSiteContentQuery("curriculum_age_groups");
  const { data: curriculumPages } = useSiteContentQuery("curriculum_pages");
  const currentGroup = ageGroup ? getCurriculumAgeGroupBySlug(ageGroups, ageGroup) : undefined;

  if (!currentGroup) {
    return <Navigate to="/curriculum" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${currentGroup.title} Curriculum`}
        description={currentGroup.subtitle}
        pathname={`/curriculum/age/${currentGroup.slug}`}
      />
      <Header />
      <main className="section-shell">
        <div className="container">
          <CurriculumAgeGroupView
            ageGroup={currentGroup}
            pages={getCurriculumPagesByAgeGroup(curriculumPages, currentGroup.slug)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CurriculumAgeGroup;
