import os
data_mahasiswa = [
    {
        'nama': 'Arrauf',
        'NIM': '123140032',
        'nilai_uts': 80,
        'nilai_uas': 90,
        'nilai_tugas': 70
    },
    {
        'nama': 'Danang',
        'NIM': '123140005',
        'nilai_uts': 70,
        'nilai_uas': 75,
        'nilai_tugas': 80
    },
    {
        'nama': 'Daniel',
        'NIM': '123140004',
        'nilai_uts': 50,
        'nilai_uas': 60,
        'nilai_tugas': 55
    },
    {
        'nama': 'dakim',
        'NIM': '123140002',
        'nilai_uts': 90,
        'nilai_uas': 95,
        'nilai_tugas': 100
    },
    {
        'nama': 'akbar',
        'NIM': '123140003',
        'nilai_uts': 60,
        'nilai_uas': 40,
        'nilai_tugas': 70
    }
]

def hitung_nilai_akhir(uts, uas, tugas):
    return (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)

def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

def tampilkan_data(mahasiswa_list):
    if not mahasiswa_list:
        print(">>> Tidak ada data untuk ditampilkan.")
        return

    print("\n" + "=" * 100)
    print(f"| {'No':<3} | {'Nama':<20} | {'NIM':<10} | {'UTS':<5} | {'UAS':<5} | {'Tugas':<5} | {'Akhir':<6} | {'Grade':<5} |")
    print("-" * 100)

    for i, mhs in enumerate(mahasiswa_list, 1):
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        
        print(f"| {i:<3} | {mhs['nama']:<20} | {mhs['NIM']:<10} | "
              f"{mhs['nilai_uts']:<5} | {mhs['nilai_uas']:<5} | {mhs['nilai_tugas']:<5} | "
              f"{nilai_akhir:<6.2f} | {grade:<5} |")
    
    print("-" * 100)

def cari_tertinggi_terendah(mahasiswa_list):
    if not mahasiswa_list:
        print(">>> Data masih kosong.")
        return

    tertinggi = max(mahasiswa_list, 
                    key=lambda mhs: hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas']))
    
    terendah = min(mahasiswa_list, 
                   key=lambda mhs: hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas']))

    print("\n--- Mahasiswa Nilai Tertinggi ---")
    print(f"Nama : {tertinggi['nama']} ({tertinggi['NIM']})")
    print(f"Nilai Akhir: {hitung_nilai_akhir(tertinggi['nilai_uts'], tertinggi['nilai_uas'], tertinggi['nilai_tugas']):.2f}")

    print("\n--- Mahasiswa Nilai Terendah ---")
    print(f"Nama : {terendah['nama']} ({terendah['NIM']})")
    print(f"Nilai Akhir: {hitung_nilai_akhir(terendah['nilai_uts'], terendah['nilai_uas'], terendah['nilai_tugas']):.2f}")


def input_data_baru(mahasiswa_list):
    print("\n--- Input Data Mahasiswa Baru ---")
    nama = input("Nama: ")
    nim = input("NIM: ")
    
    while True:
        try:
            uts = float(input("Nilai UTS: "))
            uas = float(input("Nilai UAS: "))
            tugas = float(input("Nilai Tugas: "))
            if 0 <= uts <= 100 and 0 <= uas <= 100 and 0 <= tugas <= 100:
                break
            else:
                print(">>> Nilai harus berada di antara 0 dan 100.")
        except ValueError:
            print(">>> Input tidak valid. Masukkan angka untuk nilai.")

    mahasiswa_baru = {
        'nama': nama,
        'NIM': nim,
        'nilai_uts': uts,
        'nilai_uas': uas,
        'nilai_tugas': tugas
    }
    
    mahasiswa_list.append(mahasiswa_baru)
    print(f">>> Data untuk {nama} berhasil ditambahkan.")
    return mahasiswa_list

def filter_by_grade(mahasiswa_list):
    if not mahasiswa_list:
        print(">>> Data masih kosong.")
        return

    grade_dicari = input("Masukkan Grade yang ingin dicari (A/B/C/D/E): ").upper()
    
    if grade_dicari not in ['A', 'B', 'C', 'D', 'E']:
        print(">>> Grade tidak valid. Harap masukkan A, B, C, D, atau E.")
        return

    filtered_list = []
    
    for mhs in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        
        if grade == grade_dicari:
            filtered_list.append(mhs)

    if not filtered_list:
        print(f"\n>>> Tidak ada mahasiswa dengan grade {grade_dicari}.")
    else:
        print(f"\n--- Daftar Mahasiswa Grade {grade_dicari} ---")
        tampilkan_data(filtered_list)

def hitung_rata_rata_kelas(mahasiswa_list):
    if not mahasiswa_list:
        print(">>> Data masih kosong.")
        return

    total_nilai = 0
    
    for mhs in mahasiswa_list:
        total_nilai += hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])

    rata_rata = total_nilai / len(mahasiswa_list)
    
    print(f"\nTotal Mahasiswa: {len(mahasiswa_list)}")
    print(f"Rata-rata Nilai Akhir Kelas: {rata_rata:.2f}")


def main():
    data_saat_ini = data_mahasiswa
    
    while True:
        
        print("\n" + "=" * 40)
        print("  Program Pengelolaan Data Nilai Mahasiswa")
        print("=" * 40)
        print("1. Tampilkan Semua Data Mahasiswa")
        print("2. Input Data Mahasiswa Baru")
        print("3. Cari Nilai Tertinggi & Terendah")
        print("4. Filter Mahasiswa Berdasarkan Grade")
        print("5. Hitung Rata-rata Nilai Kelas")
        print("0. Keluar")
        print("=" * 40)

        pilihan = input("Pilih menu (0-5): ")

        if pilihan == '1':
            tampilkan_data(data_saat_ini)
        
        elif pilihan == '2':
            data_saat_ini = input_data_baru(data_saat_ini)
        
        elif pilihan == '3':
            cari_tertinggi_terendah(data_saat_ini)
        
        elif pilihan == '4':
            filter_by_grade(data_saat_ini)
        
        elif pilihan == '5':
            hitung_rata_rata_kelas(data_saat_ini)
        
        elif pilihan == '0':
            print("\nTerima kasih! Program selesai.")
            break
        
        else:
            print("\n>>> Pilihan tidak valid. Silakan coba lagi.")
        
        input("\nTekan Enter untuk kembali ke menu...")


if __name__ == "__main__":
    main()