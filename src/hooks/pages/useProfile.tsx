import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/hooks/useUserContext";
import { useProfileContext } from "@/hooks/useProfileContext";
import { getUserHoursRecords } from "@/lib/hoursService";
import { auth } from "@/lib/firebase";

export const useProfile = () => {
  const { displayName: authDisplayName, photoURL: authPhotoURL } = useUserContext();
  const { userProfile, activeJobProfile, isLoading } = useProfileContext();
  const navigate = useNavigate();

  const [hoursSummary, setHoursSummary] = useState<{ company: string; total: number }[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);

  useEffect(() => {
    const fetchHours = async () => {
      if (!auth.currentUser) return;

      try {
        const records = await getUserHoursRecords(auth.currentUser.uid);
        const summaryMap: Record<string, number> = {};
        let total = 0;

        records.forEach((record) => {
          const h = parseFloat(record.total_horas || "0");
          const val = isNaN(h) ? 0 : h;
          const company = record.empresa?.trim() || "GENERAL";
          const companyKey = company.toUpperCase();

          if (!summaryMap[companyKey]) {
            summaryMap[companyKey] = 0;
          }
          summaryMap[companyKey] += val;
          total += val;
        });

        const summaryArray = Object.keys(summaryMap).map((key) => ({
          company: key,
          total: summaryMap[key],
        }));

        summaryArray.sort((a, b) => {
          if (activeJobProfile && a.company === activeJobProfile.companyName.toUpperCase())
            return -1;
          if (activeJobProfile && b.company === activeJobProfile.companyName.toUpperCase())
            return 1;
          return b.total - a.total;
        });

        setHoursSummary(summaryArray);
        setGrandTotal(total);
      } catch (error) {
        console.error("Error cargando bolsa de horas:", error);
      }
    };

    fetchHours();
  }, [activeJobProfile]);

  const displayName = userProfile?.displayName || authDisplayName || "USUARIO ANONIMO";
  const photoURL = userProfile?.photoURL || authPhotoURL;
  const phoneNumber = userProfile?.phoneNumber;
  const employeeId = activeJobProfile?.employeeId;
  const hasMissingInfo = !activeJobProfile || !activeJobProfile.jobTitle;

  const handleEditProfile = () => {
    navigate("/create-profile");
  };

  return {
    displayName,
    photoURL,
    phoneNumber,
    employeeId,
    userProfile,
    activeJobProfile,
    isLoading,
    hasMissingInfo,
    hoursSummary,
    grandTotal,
    handleEditProfile,
  };
};

export default useProfile;
