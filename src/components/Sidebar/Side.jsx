import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Icons from "views/Icons.js";
import Link from '@material-ui/core/Link';
export default function Side({ useStyles, onClick }) {
  //console.log(color)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const preventDefault = (event) => event.preventDefault();
  let data = [
    {
      icon: <PeopleIcon className={classes.icon2} color="disabled" />,
      modulo: "Configuraciones",
      subModulos: [
        {
          path: "/icons",
          name: "Icons",
          rtlName: "الرموز",
          icon: "tim-icons icon-atom",
          component: Icons,
          layout: "/admin",
        },
        {
          path: "/icons",
          name: "Icons",
          rtlName: "الرموز",
          icon: "tim-icons icon-atom",
          component: Icons,
          layout: "/admin",
        },
      ],
      panel: "1",
    },
    {
      icon: <ShoppingCartIcon className={classes.icon2} color="disabled" />,
      modulo: "Ventas",
      subModulos: [
        {
          path: "/icons",
          name: "Icons",
          rtlName: "الرموز",
          icon: "tim-icons icon-atom",
          component: Icons,
          layout: "/admin",
        },
        {
          path: "/icons",
          name: "Icons",
          rtlName: "الرموز",
          icon: "tim-icons icon-atom",
          component: Icons,
          layout: "/admin",
        },
      ],
      panel: "2",
    },
    {
      icon: <PeopleIcon className={classes.icon2} color="disabled" />,
      modulo: "Clientes",
      subModulos: [
        {
          path: "/icons",
          name: "Icons",
          rtlName: "الرموز",
          icon: "tim-icons icon-atom",
          component: Icons,
          layout: "/admin",
        },
        {
          path: "/icons",
          name: "Icons",
          rtlName: "الرموز",
          icon: "tim-icons icon-atom",
          component: Icons,
          layout: "/admin",
        },
      ],
      panel: "3",
    },
  ];

  return (
    <div className={classes.root}>
      {data.map((modulos, index) => (
        <Accordion
          key={index}
          expanded={expanded === `${modulos.panel}`}
          onChange={handleChange(`${modulos.panel}`)}
          className={classes.root}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            {modulos.icon}
            <Typography className={classes.heading}>
              {modulos.modulo}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.heading}>
              {modulos.subModulos.map((data, index) => (
                <ul key={index}>
      
                  <Link href={data.layout + data.path} onClick={onClick}>
                     {data.name}
                  </Link>
                  {data.reportes2 ? <li>{data.reportes2}</li> : ""}
                </ul>
              ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
