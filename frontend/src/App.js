import React, { useState } from "react";
import axios from "axios";

function App() {

  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);

  const loginToSalesforce = () => {
    window.location.href =
      "http://localhost:5000/auth/login";
  };

  const fetchRules = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/validation-rules"
      );

      setRules(response.data);

    } catch (error) {

      console.error(error);
      alert("Unable to fetch validation rules");

    } finally {

      setLoading(false);
    }
  };

  const toggleRule = async (id, active) => {

  try {

    await axios.patch(
      `http://localhost:5000/toggle-rule/${id}`,
      {
        active: !active,
      }
    );

    const updatedRules = rules.map((rule) => {

      if (rule.Id === id) {

        return {
          ...rule,
          Active: !active,
        };
      }

      return rule;
    });

    setRules(updatedRules);

  } catch (error) {

    console.error(error);
    alert("Toggle failed");
  }
};
  return (

    <div style={{ padding: "30px" }}>

      <h1>
        Salesforce Validation Rule Manager
      </h1>

      <button onClick={loginToSalesforce}>
        Login To Salesforce
      </button>

      <br /><br />

      <button onClick={fetchRules}>
        Get Validation Rules
      </button>

      <br /><br />

      {loading && <p>Loading...</p>}

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Validation Rule</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {rules.map((rule) => (

            <tr key={rule.Id}>

              <td>{rule.ValidationName}</td>

              <td>
                {rule.Active
                  ? "Active"
                  : "Inactive"}
              </td>

              <td>

                <button
                  onClick={() =>
                    toggleRule(
                      rule.Id,
                      rule.Active
                    )
                  }
                >
                  Toggle
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;
