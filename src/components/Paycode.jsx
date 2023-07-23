import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

function Paycode({ listeColorRegion }) {
  let { codepays } = useParams();
  const [namePays, setNamePays] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha?codes=${codepays}&fields=name`)
      .then((res) => {
        setNamePays(res.data[0].name.common);
        console.log(res.data[0].name.common);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [codepays]);

  return (
    <div>
      <Card listeColorRegion={listeColorRegion} namePaysProps={namePays} />
    </div>
  );
}

export default Paycode;
