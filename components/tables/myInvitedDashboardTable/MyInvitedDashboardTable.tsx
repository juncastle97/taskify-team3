import styles from "./MyInvitedDashboardTable.module.scss";
import { MappedInvitations } from "@/types/invitations";
import SearchBar from "@/components/input/SearchBar";
import NoInvitation from "@/components/tables/myInvitedDashboardTable/NoInvitation";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import DesktopTable from "@/components/tables/myInvitedDashboardTable/DesktopTable";
import MobileList from "@/components/tables/myInvitedDashboardTable/MobileList";
import { useWindowSize } from "usehooks-ts";

interface MyInvitedDashboardTableProps {
  data: MappedInvitations;
  setData: Dispatch<SetStateAction<MappedInvitations>>;
  filteredData: MappedInvitations;
  setFilteredData: Dispatch<SetStateAction<MappedInvitations>>;
}

const MyInvitedDashboardTable = ({
  data,
  setData,
  filteredData,
  setFilteredData,
}: MyInvitedDashboardTableProps) => {
  const { width = 0 } = useWindowSize();
  const isMobile = width <= 768;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const input = e.target.value;

    setFilteredData(
      data.filter(
        invitation =>
          invitation.dashboard.includes(input) ||
          invitation.inviter.includes(input),
      ),
    );
  };

  const handleButtonClick = (id: number) => {
    setData(prev => prev.filter(invitation => invitation.id !== id));
    setFilteredData(prev => prev.filter(invitation => invitation.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>초대받은 대시보드</div>
      {data.length ? (
        <div className={styles.tableArea}>
          <SearchBar onChange={handleInputChange} />
          {isMobile ? (
            <MobileList
              datas={filteredData}
              handleButtonClick={handleButtonClick}
            />
          ) : (
            <DesktopTable
              datas={filteredData}
              handleButtonClick={handleButtonClick}
            />
          )}
        </div>
      ) : (
        <NoInvitation />
      )}
    </div>
  );
};

export default MyInvitedDashboardTable;
