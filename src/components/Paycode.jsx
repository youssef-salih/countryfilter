import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

function Paycode() {
  let { codepays } = useParams();
  const [namePays, setNamePays] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha?code=${codepays}&fields=name`)
      .then((res) => {
        setNamePays(res.data[0].name.common);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [codepays]);

  return (
    <div>
      <Card namePaysProps={namePays} />
    </div>
  );
}

export default Paycode;
