import { Request, Response } from "express";

/**
 * YYYY-MM-DDTHH:MM:SS
 */
export type DateTime =
  `${number}-${number}-${number}T${number}:${number}:${number}`;

export type ControllerType = {
  [key: string]: (req: Request, res: Response) => Promise<void>;
};
