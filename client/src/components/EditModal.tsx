import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { RowType } from "../containers/interface";
import { useForm } from "antd/es/form/Form";

interface EditModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleOk: (editRowData?: RowType | undefined) => void;
  editRowData?: RowType;
  totalRows: number;
}

const EditModal = ({
  isModalOpen,
  handleCancel,
  handleOk,
  editRowData,
  totalRows,
}: EditModalProps) => {
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue(editRowData);
  }, [editRowData, form]);
  return (
    <>
      <Modal
        title={editRowData ? "Edit user info" : "Create new user"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={(values) =>
            handleOk({
              ...values,
              key: editRowData ? editRowData.key : totalRows + 1,
            })
          }
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Course Name"
            name="course_name"
            rules={[
              { required: true, message: "Please input your course name!" },
            ]}
          >
            <Input placeholder="Enter course name" />
          </Form.Item>
          <Form.Item
            label="Passing Year"
            name="passing_year"
            rules={[
              { required: true, message: "Please input your passing year!" },
            ]}
          >
            <Input placeholder="Enter passing year" />
          </Form.Item>
          <Form.Item
            label="University Name"
            name="university_name"
            rules={[
              { required: true, message: "Please input your university name!" },
            ]}
          >
            <Input placeholder="Enter university name" />
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            rules={[
              { required: true, message: "Please input your department!" },
            ]}
          >
            <Input placeholder="Enter department" />
          </Form.Item>
          <Form.Item
            label="Job Title"
            name="job_title"
            rules={[
              { required: true, message: "Please input your job title!" },
            ]}
          >
            <Input placeholder="Enter job title" />
          </Form.Item>
          <Form.Item
            label="Company Name"
            name="company_name"
            rules={[
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>
          <Form.Item
            label="Contact No."
            name="contact_no"
            rules={[
              { required: true, message: "Please input your contact no.!" },
            ]}
          >
            <Input placeholder="Enter contact no." />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
