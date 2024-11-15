import { Tabs, Tab, Box, Typography } from "@mui/material";
import { FC, useState } from "react";
import PicasFijas from "../picas-fijas/picas-fijas";
import RockPaperScissors from "../rock-paper-scissors/rock-paper-scissors";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Container = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    console.log("event", event, "newValue", newValue);
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
        <Tab label="Picas y Fijas" />
        <Tab label="Piebra, Papel o Tijeras " />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PicasFijas />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RockPaperScissors />
      </TabPanel>
    </Box>
  );
};

export default Container;
