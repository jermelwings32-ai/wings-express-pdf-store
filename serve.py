"""
Wings Express PDF Store — Production Web Server
Serves the static website + provides health check endpoint.
Run: python3 serve.py
Access: http://localhost:8080 (local) or via Cloudflare Tunnel (public)
"""
import http.server
import socketserver
import os
import json
from datetime import datetime

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class WingsHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler with CORS, health check, and proper MIME types."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def do_GET(self):
        # Health check endpoint
        if self.path == '/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = json.dumps({
                "status": "healthy",
                "service": "Wings Express PDF Store",
                "timestamp": datetime.now().isoformat(),
                "uptime": "active"
            })
            self.wfile.write(response.encode())
            return
        
        # Serve static files normally
        super().do_GET()
    
    def end_headers(self):
        # Add security and caching headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('Cache-Control', 'public, max-age=3600')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def log_message(self, format, *args):
        """Custom logging with timestamp."""
        print(f"[{datetime.now().strftime('%H:%M:%S')}] {args[0]}")


def main():
    print("=" * 60)
    print("  🚀 WINGS EXPRESS PDF STORE")
    print("  📄 Premium AI & Marketing Guides")
    print("=" * 60)
    print(f"  🌐 Local:  http://localhost:{PORT}")
    print(f"  📁 Serving: {DIRECTORY}")
    print(f"  ❤️  Health:  http://localhost:{PORT}/health")
    print("=" * 60)
    print("  Press Ctrl+C to stop\n")
    
    with socketserver.TCPServer(("", PORT), WingsHandler) as httpd:
        httpd.allow_reuse_address = True
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped.")
            httpd.shutdown()


if __name__ == "__main__":
    main()
