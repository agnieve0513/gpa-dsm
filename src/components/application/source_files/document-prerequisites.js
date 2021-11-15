const prerequisites = [
  {
    _id: "1",
    description: "Most Recent GPA Billing Statement",
    information: [
      "a) Primary Name on GPA Account ",
      "b) GPA Electric Account Number",
      "c) Most recent Bill ID",
    ],
    additional: ``,
    image_sample: "./GPADSM9.png",
  },
  {
    _id: "2",
    description: "Invoice",
    information: [
      `a) Equipment Model, Vendor, and Manufacturer`,
      `b) Invoice Number`,
      `c) Invoice Date`,
    ],
    additional: `a) Installer must print and sign the invoice
        if they are the disposal party for existing equipment.`,
    image_sample: "./GPADSM5.png",
  },
  {
    _id: "3",
    description: "W-9",
    information: [
      `a) Name, SSN/TIN (Must match the applicant)`,
      `b) Address (Where check will be issued)`,
      `c) Signature and Date`,
    ],
    additional: ``,
    image_sample: "./sample_invoice.png",
  },
  {
    _id: "4",
    description: `Installer Information`,
    information: [`a) Technician Name, Company, Contact Number, and Email`],
    additional: "a) Technician Name, Company, Contact Number, and Email",
    image_sample: "./GPADSM8.png",
  },
  {
    _id: "5",
    description: "Disposal Slip",
    information: [],
    additional:
      "a) Customer must provide a disposal slip if the customer is the disposal party for existing equipment",
    image_sample: "./GPADSM6.png",
  },
  {
    _id: "6",
    description: `Letter of Authorization (LOA)`,
    information: [],
    additional: `a) Upload and attach LOA (Only if the applicant is neither the GPA Account Holder or Property)`,
    image_sample: "./GPADSM7.png",
  },
  {
    _id: "7",
    description: `Other Supporting Documents`,
    information: [],
    additional: `a) GPA will advise you if any supporting documents may be required.`,
    image_sample: "./GPADSM4.png",
  },
];

export default prerequisites;
