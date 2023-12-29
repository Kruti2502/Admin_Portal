import { Button, Form, Input, Modal, Steps, message } from "antd";
import { useEffect, useState } from "react";
import { RowType } from "../containers/interface";
import { useForm } from "antd/es/form/Form";
import { initialRawData } from "../utils/utils";

interface EditModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleOk: (editRowData?: RowType) => void;
  editRowData?: RowType;
  totalRows: number;
  setEditRowData: React.Dispatch<React.SetStateAction<RowType>>;
}

const EditModal = ({
  isModalOpen,
  handleCancel,
  handleOk,
  editRowData,
  totalRows,
  setEditRowData,
}: EditModalProps) => {
  const { Step } = Steps;
  const [form] = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<RowType | {}>({});
  useEffect(() => {
    form.setFieldsValue(editRowData);
  }, [editRowData, form]);

  const isEmptyObject =
    JSON.stringify(editRowData) === JSON.stringify(initialRawData);

  const onFinish = (values: any) => {
    // Handle form submission logic here
    console.log({
      values,
    });
    setData((prev) => ({
      ...prev,
      ...values,
    }));

    if (currentStep === 3) {
      handleOk({
        ...data,
        key: !isEmptyObject ? editRowData?.key : totalRows + 1,
        contact_no: values?.contact_no,
      } as RowType);
      setCurrentStep(0);
      form.resetFields();
      setEditRowData(initialRawData);
    }
  };

  const steps = [
    {
      title: "Basic Details",
      content: (
        <Form
          name="basicdetails"
          form={form}
          onFinish={(values) => {
            onFinish(values);
            setCurrentStep(1);
          }}
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Education Details",
      content: (
        <Form
          name="educationdetails"
          form={form}
          onFinish={(values) => {
            onFinish(values);
            setCurrentStep(2);
          }}
        >
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Professional Details",
      content: (
        <Form
          name="professionaldetails"
          form={form}
          onFinish={(values) => {
            onFinish(values);
            setCurrentStep(3);
          }}
        >
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Contact Deails",
      content: (
        <div>
          {/* Display a summary of the entered information */}
          {/* You can customize this section based on your requirements */}
          <Form name="contactdeails" form={form} onFinish={onFinish}>
            <Form.Item
              label="Contact No."
              name="contact_no"
              rules={[
                { required: true, message: "Please input your contact no.!" },
              ]}
            >
              <Input placeholder="Enter contact no." />
            </Form.Item>
            {/* Render a summary of the entered information */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        title={!isEmptyObject ? "Edit user info" : "Create new user"}
        open={isModalOpen}
        onCancel={() => {
          handleCancel();
          setEditRowData(initialRawData);
        }}
        footer={null}
        className="userdetails-modal"
      >
        <div>
          <Steps current={currentStep} size="small">
            {steps.map((step) => (
              <Step key={step.title} title={step.title} />
            ))}
          </Steps>
          <div style={{ marginTop: "16px" }}>{steps[currentStep].content}</div>
        </div>
      </Modal>
    </>
  );
};

export default EditModal;
