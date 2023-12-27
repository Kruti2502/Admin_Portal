import { RowType } from "../containers/interface";
import { setUserData } from "../slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface UseHandlersProps {
  setEditRowData: (value: React.SetStateAction<RowType | undefined>) => void;
  showModal: () => void;
  allUsersData: Omit<RowType, "edit">[];
}

const useHandlers = ({
  setEditRowData,
  showModal,
  allUsersData,
}: UseHandlersProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const editClickHandler = (row: RowType) => {
    setEditRowData(row);
    showModal();
  };
  const deleteClickHandler = (row: RowType) => {
    const editedData = allUsersData.filter((d) => d.key !== row.key);
    dispatch(setUserData({ userData: editedData }));
  };

  return {
    logoutHandler,
    editClickHandler,
    deleteClickHandler,
  };
};

export default useHandlers;
