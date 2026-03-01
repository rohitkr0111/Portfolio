import React, { useState } from "react";
import "./Contact.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import mail_icon from "../../assets/mail_icon.svg";
import location_icon from "../../assets/location_icon.svg";
import call_icon from "../../assets/call_icon.svg";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    formData.append("access_key", "65eb1b93-4407-4e67-894c-7a571215bc74");
    formData.append("subject", "New Contact From Your Website");
    
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
   
      // Reset form on successful submission
      event.target.reset();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="contact">
      <div className="contact-title">
        <h1>Get In Touch</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="section">
        <div className="contact-left">
          <h1>Let's Talk</h1>
          <p>
            I am currently available to talk on new projects, so feel free to
            send me a message about anything that you want me to work on.
          </p>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={mail_icon} alt="" />
              <p>rohitkumarsingh1168@gmail.com</p>
            </div>
            <div className="contact-detail">
              <img src={call_icon} alt="" />
              <p>+917004545342</p>
            </div>
            <div className="contact-detail">
              <img src={location_icon} alt="" />
              <p>India</p>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="contact-right">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            placeholder="Enter Your name"
            name="name"
            required
          />
          
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            placeholder="Enter Your email"
            name="email"
            required
          />
          
          <label htmlFor="message">Write Your Message</label>
          <textarea
            name="message"
            rows="8"
            placeholder="Enter Your message"
            required
          ></textarea>
          
          <input
            type="hidden"
            name="access_key"
            value="65eb1b93-4407-4e67-894c-7a571215bc74"
          />
          
          <button
            type="submit"
            className="contact-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;