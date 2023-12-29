import { useState } from "react";
import { RowType } from "../containers/interface";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, users } from "../slice/userSlice";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allUsersData = useSelector(users) || [];
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (editRowData?: RowType) => {
    setIsModalOpen(false);
    const editedData = allUsersData.map((d) => {
      if (d.key === editRowData?.key) {
        return {
          ...editRowData,
        };
      } else {
        return d;
      }
    });

    allUsersData.length < editRowData!.key && editedData.push(editRowData!);

    dispatch(setUserData({ userData: editedData }));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    showModal,
    handleCancel,
    handleOk,
  };
};

export default useModal;
