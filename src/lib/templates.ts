const data = {
  helper: `import { NAMELModel } from '../../../../../models';

export const genNAMEUs = () => {
  console.log('NAMELs []');
};`,
  controller: `import { Request, Response } from "express";
import { NAMELModel } from "../../../../models";

export const getNAMEUs = async (req: Request, res: Response) => {
  const NAMELs = await NAMELModel.find();
  res.json({ NAMELs });
};`,
  interface: `interface INAMEU {
  name: string;
};

export default INAMEU;`,
  middleware: "",
  model: `import { Schema, model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import INAMEU from "../interfaces/NAMEL.interface";

// const ObjectId = Schema.Types.ObjectId;

const NAMELSchema = new Schema<INAMEU & Schema>(
  {
    name: { type: String, required: [true, "the name is necessary"] },
  },
  { versionKey: false, timestamps: true }
);

NAMELSchema.plugin(uniqueValidator, {
  message: "The {PATH} needs to be unique",
});

export default model<INAMEU & Document>("NAMEL", NAMELSchema);`,
  routes: `import { Router } from "express";
import * as NAMELController from "../controllers/NAMEL.controller";
// import * as NAMELMiddleWare  from "../middlewares/NAMEL.middleware";
// import * as NAMELHelper  from "../controllers/helpers/NAMEL.helper";
// import * as sessionAuth  from "../../../../config/sessionAuth";

const router = Router();
// const moduleName = "/NAMELs";
const route = "/APIVERSION/NAMELs";

router.get(route, NAMELController.getNAMEUs);

export default router;  
`,
};

export default data;
