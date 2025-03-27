import { calendarApi } from "../../src/api/calendarApi";
describe('Calendar API', () => {
    
    test("debe de tener la configuración por defecto", () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
        expect(calendarApi.defaults.headers["Content-type"]).toBe("application/json");
    }
    );
});

