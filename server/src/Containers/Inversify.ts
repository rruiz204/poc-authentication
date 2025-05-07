import { Container } from "inversify";
import { Application } from "./Layers/Application";
import { Presentation } from "./Layers/Presentation";
import { Infrastructure } from "./Layers/Infrastructure";

export const Inversify = new Container();

Inversify.load(Infrastructure);
Inversify.load(Application);
Inversify.load(Presentation);