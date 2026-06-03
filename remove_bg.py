from PIL import Image

def make_white_transparent(image_path, output_path, tolerance=220):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # Check if the pixel is white-ish
        if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
            # Change all white-ish (also shades of white)
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    make_white_transparent("public/assets/makro_emblem.png", "public/assets/makro_emblem_transparent.png")
