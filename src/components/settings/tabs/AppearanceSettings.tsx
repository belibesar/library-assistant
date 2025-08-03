import { useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import FormSelect from "../forms/FormSelect";
import ToggleSwitch from "../forms/ToggleSwitch";

const AppearanceSettings = () => {
  const [appearance, setAppearance] = useState({
    theme: "light",
    fontSize: "medium",
    colorScheme: "blue",
    compactMode: false,
    animations: true,
    highContrast: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">Tema</h3>
        <div className="grid grid-cols-3 gap-4">
          {["light", "dark", "auto"].map((theme) => (
            <button
              key={theme}
              onClick={() => setAppearance({ ...appearance, theme })}
              className={`rounded-lg border-2 p-4 text-center ${
                appearance.theme === theme
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="mb-2 flex justify-center">
                {theme === "light" && <Sun className="h-6 w-6" />}
                {theme === "dark" && <Moon className="h-6 w-6" />}
                {theme === "auto" && <Monitor className="h-6 w-6" />}
              </div>
              <span className="text-sm font-medium capitalize">{theme}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">Ukuran Font</h3>
        <FormSelect
          label="Ukuran Font"
          value={appearance.fontSize}
          onChange={(e) =>
            setAppearance({ ...appearance, fontSize: e.target.value })
          }
          options={[
            { value: "small", label: "Kecil" },
            { value: "medium", label: "Sedang" },
            { value: "large", label: "Besar" },
          ]}
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">Warna Aksen</h3>
        <div className="grid grid-cols-6 gap-3">
          {["blue", "green", "purple", "red", "orange", "gray"].map((color) => (
            <button
              key={color}
              onClick={() =>
                setAppearance({ ...appearance, colorScheme: color })
              }
              className={`h-10 w-10 rounded-full border-2 ${
                appearance.colorScheme === color
                  ? "border-gray-900"
                  : "border-gray-300"
              }`}
              style={{
                backgroundColor: `var(--color-${color}-500, #${color === "blue" ? "3b82f6" : color === "green" ? "10b981" : color === "purple" ? "8b5cf6" : color === "red" ? "ef4444" : color === "orange" ? "f97316" : "6b7280"})`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Aksesibilitas
        </h3>
        <div className="space-y-4">
          <ToggleSwitch
            label="Mode Kompak"
            description="Tampilan yang lebih rapat dan efisien"
            checked={appearance.compactMode}
            onChange={(checked) =>
              setAppearance({ ...appearance, compactMode: checked })
            }
          />

          <ToggleSwitch
            label="Animasi"
            description="Aktifkan animasi dan transisi"
            checked={appearance.animations}
            onChange={(checked) =>
              setAppearance({ ...appearance, animations: checked })
            }
          />

          <ToggleSwitch
            label="Kontras Tinggi"
            description="Tingkatkan kontras untuk kemudahan membaca"
            checked={appearance.highContrast}
            onChange={(checked) =>
              setAppearance({ ...appearance, highContrast: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
