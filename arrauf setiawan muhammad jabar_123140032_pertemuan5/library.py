from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self._id = item_id
        self._title = title

    @property
    def id(self):
        return self._id

    @property
    def title(self):
        return self._title

    @abstractmethod
    def get_details(self):
        pass

class Book(LibraryItem):
    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self._author = author

    def get_details(self):
        return f"[Buku] ID: {self.id}, Judul: {self.title}, Pengarang: {self._author}"

class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue):
        super().__init__(item_id, title)
        self._issue = issue

    def get_details(self):
        return f"[Majalah] ID: {self.id}, Judul: {self.title}, Edisi: {self._issue}"

class Library:
    def __init__(self):
        self.__items = []

    def add_item(self, item):
        if isinstance(item, LibraryItem):
            self.__items.append(item)
            print(f"\nSukses: Item '{item.title}' telah ditambahkan.")
        else:
            print("\nError: Objek tidak valid.")

    def display_available_items(self):
        if not self.__items:
            print("\nPerpustakaan masih kosong.")
            return
        
        print("\n--- Daftar Item di Perpustakaan ---")
        for item in self.__items:
            print(item.get_details())
        print("-----------------------------------")

    def search_item(self, query):
        print(f"\n--- Hasil Pencarian untuk '{query}' ---")
        found_items = []
        query = query.lower()
        
        for item in self.__items:
            if query in item.id.lower() or query in item.title.lower():
                found_items.append(item)
        
        if not found_items:
            print("Item tidak ditemukan.")
        else:
            for item in found_items:
                print(item.get_details())
        print("---------------------------------")

def tambah_item_interaktif(library):
    print("\nPilih tipe item yang ingin ditambahkan:")
    print("1. Buku")
    print("2. Majalah")
    tipe_item = input("Pilihan (1/2): ")

    if tipe_item == '1':
        item_id = input("Masukkan ID Buku (cth: B001): ")
        title = input("Masukkan Judul Buku: ")
        author = input("Masukkan Nama Pengarang: ")
        item_baru = Book(item_id, title, author)
        library.add_item(item_baru)
    elif tipe_item == '2':
        item_id = input("Masukkan ID Majalah (cth: M001): ")
        title = input("Masukkan Judul Majalah: ")
        issue = input("Masukkan Edisi Terbitan: ")
        item_baru = Magazine(item_id, title, issue)
        library.add_item(item_baru)
    else:
        print("\nPilihan tidak valid. Kembali ke menu utama.")

def cari_item_interaktif(library):
    query = input("\nMasukkan Judul atau ID yang ingin dicari: ")
    if not query:
        print("Input pencarian tidak boleh kosong.")
        return
    library.search_item(query)

def main_menu():
    my_library = Library()
    
    my_library.add_item(Book("B001", "Dasar Pemrograman Python", "Andi"))
    my_library.add_item(Magazine("M001", "Tempo", "Edisi Juli 2025"))
    print("\n=============================================")
    print("Selamat Datang di Sistem Perpustakaan")
    print("=============================================")

    while True:
        print("\n--- MENU UTAMA ---")
        print("1. Tambah Item Baru")
        print("2. Tampilkan Semua Item")
        print("3. Cari Item (berdasarkan Judul atau ID)")
        print("4. Keluar")
        
        pilihan = input("Masukkan pilihan Anda (1-4): ")

        if pilihan == '1':
            tambah_item_interaktif(my_library)
        elif pilihan == '2':
            my_library.display_available_items()
        elif pilihan == '3':
            cari_item_interaktif(my_library)
        elif pilihan == '4':
            print("\nTerima kasih telah menggunakan sistem. Sampai jumpa!")
            break
        else:
            print("\nPilihan tidak valid. Silakan masukkan angka 1-4.")

if __name__ == "__main__":
    main_menu()