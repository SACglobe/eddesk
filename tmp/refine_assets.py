from PIL import Image
import os

def refine_image(input_path, output_path, threshold=240):
    print(f"Refining {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # If pixel is near white, make it transparent
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    
    # Get bounding box of non-transparent areas
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        print(f"Cropped to {bbox}")
    
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

# Paths
brain_dir = r"C:\Users\acsel\.gemini\antigravity\brain\b26c9792-0d30-4ec5-9d82-db666b68d71c"
logo_input = os.path.join(brain_dir, "cleaned_logo_1773114197633.png")
icon_input = os.path.join(brain_dir, "extracted_icon_1773114233275.png")

logo_output = os.path.join(brain_dir, "logo_refined.png")
icon_output = os.path.join(brain_dir, "icon_refined.png")

# Process
refine_image(logo_input, logo_output)
refine_image(icon_input, icon_output)
