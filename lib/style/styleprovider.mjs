/**
 *
 *
 * @author: blukassen
 */

import ConstructedStyle from "./constructedstyle";
import RepeatedStyle    from "./repeatedstyle";

let provider = new RepeatedStyle();

export const useConstructed = () => provider = new ConstructedStyle();
export const useRepeated    = () => provider = new RepeatedStyle();

export default getProvider = () => provider;
