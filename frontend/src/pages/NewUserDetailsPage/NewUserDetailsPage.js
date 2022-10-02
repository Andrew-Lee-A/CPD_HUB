import React, { useState, useEffect } from "react";
import './newuserdetailspage.scss'

// images
import nameIcon from "../../img/preferedname.png";
import company from "../../img/company.png";
import experience from "../../img/experience.png";
import industry from "../../img/industrial.png";
import occupation from "../../img/occupation.png";
import country from "../../img/country.png";
import skill from "../../img/skill.png";
import total from "../../img/platform.png";
import platform from "../../img/amount.png";

const NewUserInfo = () => {
  const validation = (values) => {
    const errors = {};

    if (!values.preferedname) {
      errors.preferedname = "Your name is required";
    }

    if (!values.thecompany) {
      errors.thecompany = "Your company's name is required";
    }

    if (!values.experience) {
      errors.experience = "Your experience is required";
    } else if (!values.experience.length > 2) {
      errors.experience = "Your experience does not make sense";
    }

    if (!values.occupation) {
      errors.occupation = "Your occupation is required";
    }

    if (!values.country) {
      errors.country = "Your country is required";
    }

    /* dropdown menus */

    if (!values.field) {
      errors.field = "Your field is required";
    }

    if (!values.skill) {
      errors.skill =
        "Your interested skill of learning programming is required";
    }

    if (!values.notification) {
      errors.notification = "Your push notification is required";
    }

    if (!values.platform) {
      errors.platform = "Your prefered platform is required";
    }

    return errors;
  };

  const [values, setValues] = useState({
    preferedname: "",
    thecompany: "",
    experience: "",
    field: "",
    occupation: "",
    country: "",
    skill: "",
    notification: "",
    platform: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    // !TODO => To push the data to the database
  };

  const handleClick = (e) => {
    e.preventDefault();
    setErrors(validation(values));
  };

  console.log(values);

  return (
    <>
      <div className="UserDetailsStyle">
        <div className="userDetailsWrapper">
          <form action="" className="UserDetailsForm" onSubmit={handleSubmit}>
            <h2 className="formTitle">Additional Details Form</h2>
            <p>Dear customer you are required to fill in the form to proceed</p>

            <div className="inputWrapper">
              <img src={nameIcon} alt="" />
              <input
                onKeyPress={(event) => {
                  if (!/[a-zA-Z ]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                required="yes"
                type="text"
                className="input"
                maxLength="32"
                name="preferedname"
                value={values.preferedname}
                onChange={handleChange}
              />

              <label className="label"> Prefered Name </label>
            </div>
            {errors.preferedname && (
              <p className="error">{errors.preferedname}</p>
            )}

            <div className="inputWrapper">
              <img src={company} alt="" />
              <input
                onKeyPress={(event) => {
                  if (!/[a-zA-Z ]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                required="yes"
                maxLength="35"
                spellCheck="true"
                type="text"
                className="input"
                name="thecompany"
                value={values.thecompany}
                onChange={handleChange}
              />

              <label className="label"> Company's Name </label>
            </div>
            {errors.thecompany && <p className="error">{errors.thecompany}</p>}

            <div className="inputWrapper">
              <img src={experience} alt="" />
              <input
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                required="yes"
                type="number"
                min="0"
                max="60"
                className="input"
                name="experience"
                value={values.experience}
                onChange={handleChange}
              />

              <label className="label"> Years of Experience </label>
            </div>
            {errors.experience && <p className="error">{errors.experience}</p>}

            <div className="inputWrapperContainer">
              <div className="inputWrapperIndustry">
                <img src={industry} alt="" />
                <input
                  required="yes"
                  type="text"
                  className="input"
                  name="field"
                  value={values.field}
                  disabled="yes"
                />

                <label className="label"> Prefered Field </label>
              </div>

              <select
                id="Field"
                className="progLanguagesAndStudyFieldSelection"
                multiple={false}
                name="field"
                value={values.field}
                onChange={handleChange}
              >
                <option selected value="" disabled="yes">
                  Choose Field
                </option>
                <option value="Civil Engineer">Civil Engineer</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Electrical Engineer">Electrical Engineer</option>
                <option value="Chemical Engineer">Chemical Engineer</option>
                <option value="Mechanical Engineer">Mechanical Engineer</option>
                <option value="Architectural Engineer">
                  Architectural Engineer
                </option>
              </select>
            </div>
            {errors.field && <p className="error">{errors.field}</p>}

            <div className="inputWrapper">
              <img src={occupation} alt="" />
              <input
                onKeyPress={(event) => {
                  if (!/[a-zA-Z ]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                required="yes"
                type="text"
                className="input"
                maxLength="32"
                name="occupation"
                spellCheck="true"
                value={values.occupation}
                onChange={handleChange}
              />

              <label className="label">Occupation </label>
            </div>
            {errors.occupation && <p className="error">{errors.occupation}</p>}

            <div className="inputWrapper">
              <img src={country} alt="" />
              <input
                onKeyPress={(event) => {
                  if (!/[a-zA-Z ]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                required="yes"
                type="text"
                className="input"
                maxLength="22"
                name="country"
                spellCheck="true"
                value={values.country}
                onChange={handleChange}
              />

              <label className="label">Country of Origin </label>
            </div>
            {errors.country && <p className="error">{errors.country}</p>}

            <div className="inputWrapperContainer">
              <div className="inputWrapperSkill">
                <img src={skill} alt="" />
                <input
                  type="text"
                  className="input"
                  name="skill"
                  value={values.skill}
                  disabled="yes"
                ></input>
                <label className="label">Programming Skill</label>
              </div>

              <select
                id="programmingSkill"
                className="progLanguagesAndStudyFieldSelection"
                multiple={false}
                name="skill"
                value={values.skill}
                onChange={handleChange}
              >
                <option selected value="" disabled="yes">
                  Programming Languages
                </option>
                <option value="Java">Java</option>
                <option value="C">C</option>
                <option value="C#">C#</option>
                <option value="C++">C++</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Kotlin">Kotlin</option>
                <option value="PHP">PHP</option>
              </select>
            </div>
            {errors.skill && <p className="error">{errors.skill}</p>}

            <div className="inputWrapperContainer">
              <div className="inputWrapperTotal">
                <img src={total} alt="" />
                <input
                  required="yes"
                  type="text"
                  className="input"
                  name="notification"
                  value={values.notification}
                  disabled="yes"
                />
                <label className="label">Push Notification</label>
              </div>

              <select
                id="programmingSkill"
                className="progLanguagesAndStudyFieldSelection"
                multiple={false}
                name="notification"
                value={values.notification}
                onChange={handleChange}
              >
                <option selected value="" disabled="yes">
                  Type of Push
                </option>
                <option value="Weekly">Weekly</option>
                <option value="Fortnightly">Fortnightly (every 2 weeks)</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly (every 3 months) </option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            {errors.notification && (
              <p className="error">{errors.notification}</p>
            )}

            <div className="inputWrapperContainer">
              <div className="inputWrapperPlatform">
                <img src={platform} alt="" />
                <input
                  required="yes"
                  type="text"
                  className="input"
                  name="platform"
                  value={values.platform}
                  disabled="yes"
                />
                <label className="label">Prefered platform</label>
              </div>

              <select
                id="programmingSkill"
                className="progLanguagesAndStudyFieldSelection"
                name="platform"
                value={values.platform}
                onChange={handleChange}
              >
                <option selected value="" disabled="yes">
                  Choose Platform
                </option>
                <option value="Microsoft Teams">Microsoft Teams</option>
                <option value="Email">Email</option>
              </select>
            </div>
            {errors.platform && <p className="error">{errors.platform}</p>}

            <button
              className="submitButton"
              type="submit"
              onClick={handleClick}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};


export default NewUserInfo;