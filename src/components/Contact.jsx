

// import { useState } from "react";
// import TagLine from "./TagLine";

// const Contact = () => {
//   const formInitialDetails = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     message: "",
//   };
//   const [formDetails, setFormDetails] = useState(formInitialDetails);
//   const [buttonText, setButtonText] = useState("Send Message");
//   const [status, setStatus] = useState({});
//   const [errors, setErrors] = useState({});

//   const onFormUpdate = (category, value) => {
//     setFormDetails({
//       ...formDetails,
//       [category]: value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formDetails.firstName) newErrors.firstName = true;
//  //   if (!formDetails.lastName) newErrors.lastName = true;
//     if (!formDetails.email) newErrors.email = true;
//     if (!formDetails.message) newErrors.message = true;
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       setButtonText("Send Message");
//       return;
//     }

//     setButtonText("Sending...");
//     try {
//       let response = await fetch("http://localhost:3001/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json;charset=utf-8"
//         },
//         body: JSON.stringify(formDetails)
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       let result = await response.json();
//       setButtonText("Send");
//       setFormDetails(formInitialDetails);
//       if (result.code === 200) {
//         setStatus({ success: true, message: "Message sent successfully" });
//       } else {
//         setStatus({ success: false, message: "Something went wrong, please try again" });
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setStatus({ success: false, message: "Something went wrong, please try again" });
//     }
//   };

//   return (
//     <section id="contact">
//       <div className="px-4 py-8">
//         <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg min-h-[600px] p-8">
//           <TagLine>Contact Us</TagLine>
//           <form className="grid grid-cols-1 md:grid-cols-2 gap-8 my-5" onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-4">
//               <label className="text-lg font-semibold text-neutral-950" htmlFor="firstName">Full Name</label>
//               <input className={`border rounded-md p-2 ${errors.firstName ? "border-red-500" : "border-neutral-300"}`}
//                 type="text"
//                 value={formDetails.firstName}
//                 name="firstName"
//                 placeholder="Your Full Name"
//                 onChange={(e) => onFormUpdate("firstName", e.target.value)}
//               />
//             </div>

          

//             <div className="flex flex-col gap-4">
//               <label className="text-lg font-semibold text-neutral-950" htmlFor="email">Email Address</label>
//               <input className={`border rounded-md p-2 ${errors.email ? "border-red-500" : "border-neutral-300"}`}
//                 type="email"
//                 value={formDetails.email}
//                 name="email"
//                 placeholder="Your Email Address"
//                 onChange={(e) => onFormUpdate("email", e.target.value)} />
//             </div>

//             <div className="flex flex-col gap-4 md:col-span-2">
//               <label className="text-lg font-semibold text-neutral-950" htmlFor="message">Message</label>
//               <textarea className={`border rounded-md p-2 h-[150px] ${errors.message ? "border-red-500" : "border-neutral-300"}`}
//                 name="message"
//                 value={formDetails.message}
//                 placeholder="Your Message"
//                 onChange={(e) => onFormUpdate("message", e.target.value)}
//               >
//               </textarea>
//             </div>

//             <div className="md:col-span-2">
//               <button type="submit" className="bg-neutral-900 hover:bg-neutral-600 py-2 mt-3 rounded-lg text-white w-full">{buttonText}</button>
//             </div>
//             {status.message && (
//               <div className="row">
//                 <p className={status.success === false ? "danger" : "success"}>
//                   {status.message}
//                 </p>
//               </div>
//             )}
//           </form>

//           <div className="mt-12">
//             <h2 className="text-2xl font-semibold text-neutral-950 mb-4">Email</h2>
//             <address className="flex flex-col gap-2">
//               <span className="text-lg text-neutral-700">contact@devaura.co.za</span>
//             </address>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;


import { useState } from "react";
import TagLine from "./TagLine";

const Contact = () => {
  const formInitialDetails = {
    firstName: "",
   
    email: "",
    phone: "",
    message: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send Message");
  const [status, setStatus] = useState({});
  const [errors, setErrors] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formDetails.firstName) newErrors.firstName = true;
   
    if (!formDetails.email) newErrors.email = true;
    if (!formDetails.message) newErrors.message = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setButtonText("Send Message");
      return;
    }

    setButtonText("Sending...");
    try {
      let response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(formDetails)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let result = await response.json();
      setButtonText("Send");
      setFormDetails(formInitialDetails);
      if (result.code === 200) {
        setStatus({ success: true, message: "Message sent successfully" });
      } else {
        setStatus({ success: false, message: "Something went wrong, please try again" });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({ success: false, message: "Something went wrong, please try again" });
    }
  };

  return (
    <section id="contact">
      <div className="px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg min-h-[600px] p-8">
          <TagLine>Contact Us</TagLine>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8 my-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <label className="text-lg font-semibold text-neutral-950" htmlFor="firstName">Full Name</label>
              <input className={`border rounded-md p-2 ${errors.firstName ? "border-red-500" : "border-neutral-300"}`}
                type="text"
                value={formDetails.firstName}
                name="firstName"
                placeholder="Your Full Name"
                onChange={(e) => onFormUpdate("firstName", e.target.value)}
              />
            </div>

            
            <div className="flex flex-col gap-4">
              <label className="text-lg font-semibold text-neutral-950" htmlFor="email">Email Address</label>
              <input className={`border rounded-md p-2 ${errors.email ? "border-red-500" : "border-neutral-300"}`}
                type="email"
                value={formDetails.email}
                name="email"
                placeholder="Your Email Address"
                onChange={(e) => onFormUpdate("email", e.target.value)} />
            </div>

            <div className="flex flex-col gap-4 md:col-span-2">
              <label className="text-lg font-semibold text-neutral-950" htmlFor="message">Message</label>
              <textarea className={`border rounded-md p-2 h-[150px] ${errors.message ? "border-red-500" : "border-neutral-300"}`}
                name="message"
                value={formDetails.message}
                placeholder="Your Message"
                onChange={(e) => onFormUpdate("message", e.target.value)}
              >
              </textarea>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="bg-neutral-900 hover:bg-neutral-600 py-2 mt-3 rounded-lg text-white w-full">{buttonText}</button>
            </div>
            {status.message && (
              <div className="row">
                <p className={status.success ? "text-green-500" : "text-red-500"}>
                  {status.message}
                </p>
              </div>
            )}
          </form>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-neutral-950 mb-4">Email</h2>
            <address className="flex flex-col gap-2">
              <span className="text-lg text-neutral-700">contact@devaura.co.za</span>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
