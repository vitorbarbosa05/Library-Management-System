import { useCallback, useEffect, useState } from "react";

import { ActuatorApi } from "@/src/lib/api/actuator.api";
import type { ActuatorInfoResponse } from "@/src/lib/types/actuator.types";

export function useActuatorInfo() {
    const [info, setInfo] = useState<ActuatorInfoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        ActuatorApi.info()
            .then((data) => {
                setInfo(data);
            })
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error
                        : new Error("Error getting data from Actuator API"),
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await ActuatorApi.info();
            setInfo(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error
                    : new Error("Error getting data from Actuator API"),
            );
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        info,
        loading,
        error,
        refresh,
    };
}