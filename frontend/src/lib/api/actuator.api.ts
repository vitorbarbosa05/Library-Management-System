import http from "@/src/lib/api-client";
import type {ActuatorInfoResponse} from "@/src/lib/types/actuator.types";

export const ActuatorApi = {
    info: async (): Promise<ActuatorInfoResponse> => {
        const {data} = await http.get<ActuatorInfoResponse>("/actuator/info");
        return data;
    },
};