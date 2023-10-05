package com.example.pertemuan4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.RadioButton
import android.widget.Spinner
import android.widget.Toast

class OrderActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_order) // Ganti dengan layout XML Anda
        val provinsiArray = resources.getStringArray(R.array.provinsi_array)
        val spinnerProvinsi: Spinner = findViewById(R.id.provinsi_indonesia)

        val provinsiAdapter =
            ArrayAdapter(this, android.R.layout.simple_spinner_item, provinsiArray)
        provinsiAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerProvinsi.adapter = provinsiAdapter

        spinnerProvinsi.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>,
                view: View?,
                position: Int,
                id: Long
            ) {
                val selectedProvinsi = parent.getItemAtPosition(position).toString()
                updateKotaSpinner(selectedProvinsi) // Method untuk memperbarui spinner kota
            }

            override fun onNothingSelected(parent: AdapterView<*>) {
                // Handle when nothing is selected
            }

            private fun updateKotaSpinner(selectedProvinsi: String) {
                val kotaArrayId = when (selectedProvinsi) {
                    "Jawa Barat" -> R.array.kota_jawa_barat
                    "Jawa Timur" -> R.array.kota_jawa_timur
                    "Jawa Tengah" -> R.array.kota_jawa_tengah
                    // Tambahkan case untuk provinsi-provinsi lain di sini jika diperlukan
                    else -> R.array.kota_default // Sediakan array default jika provinsi tidak ditemukan
                }

                val kotaArray = resources.getStringArray(kotaArrayId)
                val spinnerKota: Spinner = findViewById(R.id.kota_indonesia)

                val kotaAdapter = ArrayAdapter<String>(
                    this@OrderActivity, // Provide the context of the activity or fragment
                    android.R.layout.simple_spinner_item,
                    kotaArray
                )
                kotaAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                spinnerKota.adapter = kotaAdapter
            }
        }
    }
    fun onRadioButtonClicked(view: View) {
        // Is the button now checked?
        val checked = (view as RadioButton).isChecked
        when (view.getId()) {
            R.id.sameday -> if (checked) // Same day service
                displayToast(getString(R.string.same_day_messenger_service))


            R.id.nextday -> if (checked) // Next day delivery
                displayToast(getString(R.string.next_day_ground_delivery))


            R.id.pickup -> if (checked) // Pick up
                displayToast(getString(R.string.pick_up))


            else -> {}
        }
    }


    private fun displayToast(message: String) {
        Toast.makeText(
            applicationContext, message,
            Toast.LENGTH_SHORT
        ).show()
    }

}