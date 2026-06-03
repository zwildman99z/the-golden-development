from PIL import Image

def remove_bg_flood(input_path, output_path, tolerance=30):
    img = Image.open(input_path).convert("RGBA")
    
    # We will do a manual flood fill because ImageDraw.floodfill might not handle alpha perfectly or tolerance correctly.
    width, height = img.size
    pixels = img.load()
    
    # Get the background color from top-left corner
    bg_color = pixels[0, 0]
    
    # Define a helper to check if a color is within tolerance
    def is_similar(c1, c2, tol):
        return abs(c1[0] - c2[0]) <= tol and abs(c1[1] - c2[1]) <= tol and abs(c1[2] - c2[2]) <= tol

    # Queue for BFS
    queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    visited = set()
    
    while queue:
        x, y = queue.pop(0)
        
        if (x, y) in visited:
            continue
            
        if x < 0 or x >= width or y < 0 or y >= height:
            continue
            
        visited.add((x, y))
        
        current_color = pixels[x, y]
        
        # If it's similar to the background color, make it transparent
        if is_similar(current_color, bg_color, tolerance):
            pixels[x, y] = (255, 255, 255, 0)
            
            # Add neighbors
            queue.append((x+1, y))
            queue.append((x-1, y))
            queue.append((x, y+1))
            queue.append((x, y-1))

    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_bg_flood("public/assets/makro_emblem.png", "public/assets/makro_emblem_transparent.png", tolerance=50)
